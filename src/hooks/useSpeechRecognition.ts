import { useState, useCallback, useRef, useEffect } from 'react';

interface UseSpeechRecognitionReturn {
  transcript: string;
  interimTranscript: string;
  isListening: boolean;
  startListening: () => void;
  stopListening: () => void;
  resetTranscript: () => void;
  isSupported: boolean;
  error: string | null;
  getFinalTranscript: () => string;
}

export function useSpeechRecognition(): UseSpeechRecognitionReturn {
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);
  const finalTranscriptRef = useRef('');
  const shouldListenRef = useRef(false);
  const lastResultTimeRef = useRef<number>(Date.now());
  const heartbeatIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const isSupported = typeof window !== 'undefined' && 
    ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);

  // Function to get current transcript (always returns latest value)
  const getFinalTranscript = useCallback(() => {
    return finalTranscriptRef.current;
  }, []);

  // Heartbeat check - if no results for 15 seconds, restart recognition
  const startHeartbeat = useCallback(() => {
    if (heartbeatIntervalRef.current) {
      clearInterval(heartbeatIntervalRef.current);
    }

    heartbeatIntervalRef.current = setInterval(() => {
      const timeSinceLastResult = Date.now() - lastResultTimeRef.current;
      
      if (shouldListenRef.current && timeSinceLastResult > 15000) {
        console.warn(`⚠️ No speech results for ${Math.round(timeSinceLastResult / 1000)}s - restarting recognition...`);
        
        // Stop current recognition
        if (recognitionRef.current) {
          try {
            recognitionRef.current.stop();
          } catch (e) {}
        }
        
        // Create new recognition instance
        const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        const recognition = new SpeechRecognitionAPI();
        
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';
        recognition.maxAlternatives = 1;

        // Copy event handlers
        recognition.onresult = recognitionRef.current?.onresult;
        recognition.onerror = recognitionRef.current?.onerror;
        recognition.onend = recognitionRef.current?.onend;

        recognitionRef.current = recognition;
        
        try {
          recognition.start();
          console.log('✅ Recognition restarted due to heartbeat timeout');
        } catch (e) {
          console.error('❌ Failed to restart recognition:', e);
        }
      }
    }, 5000); // Check every 5 seconds
  }, []);

  const stopHeartbeat = useCallback(() => {
    if (heartbeatIntervalRef.current) {
      clearInterval(heartbeatIntervalRef.current);
      heartbeatIntervalRef.current = null;
    }
  }, []);

  const createRecognition = useCallback(() => {
    if (!isSupported) return null;

    const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognitionAPI();
    
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: any) => {
      // Update last result time
      lastResultTimeRef.current = Date.now();
      
      let interim = '';
      
      // Process all results from this event
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        const transcript_text = result[0].transcript;
        
        if (result.isFinal) {
          // Append final result to accumulated transcript
          finalTranscriptRef.current += transcript_text + ' ';
          console.log(`🎤 [Final #${i}] "${transcript_text}" → Total: ${finalTranscriptRef.current.trim().split(/\s+/).length} words`);
          
          // Force update transcript state
          const currentTranscript = finalTranscriptRef.current.trim();
          setTranscript(currentTranscript);
          console.log(`📝 Transcript state updated: ${currentTranscript.length} chars`);
        } else {
          // Accumulate interim results
          interim += transcript_text;
        }
      }
      
      // Always update interim transcript (even if empty)
      setInterimTranscript(interim);
      
      if (interim) {
        console.log(`🎤 [Interim] "${interim}"`);
      }
    };

    recognition.onerror = (event: any) => {
      console.warn('⚠️ Speech recognition error:', event.error);
      
      if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        setError('Microphone access denied. Please allow microphone access in your browser settings.');
        setIsListening(false);
        shouldListenRef.current = false;
      } else if (event.error === 'no-speech') {
        // No speech detected - this is normal, just continue
        setError(null);
        console.log('🎤 No speech detected, continuing to listen...');
      } else if (event.error === 'audio-capture') {
        setError('No microphone found. Please connect a microphone or use text input.');
        setIsListening(false);
        shouldListenRef.current = false;
      } else if (event.error === 'network') {
        setError('Network error. Speech recognition requires internet connection.');
        console.error('🎤 Network error - check your internet connection');
      } else if (event.error === 'aborted') {
        // Recognition was aborted - will restart if shouldListenRef is true
        console.log('🎤 Recognition aborted, will restart...');
      } else {
        setError(null);
      }
    };

    recognition.onend = () => {
      console.log(`🎤 Recognition session ended (current transcript: ${finalTranscriptRef.current.trim().split(/\s+/).length} words)`);
      
      if (shouldListenRef.current) {
        // Small delay before restart
        setTimeout(() => {
          if (shouldListenRef.current) {
            try {
              console.log('🔄 Restarting recognition...');
              recognition.start();
            } catch (e) {
              console.error('❌ Failed to restart:', e);
              // Create new instance
              const newRecognition = createRecognition();
              if (newRecognition) {
                recognitionRef.current = newRecognition;
                try {
                  newRecognition.start();
                  console.log('✅ Created new recognition instance');
                } catch (e2) {
                  console.error('❌ Failed to start new instance:', e2);
                  setIsListening(false);
                }
              }
            }
          }
        }, 100);
      } else {
        setIsListening(false);
        stopHeartbeat();
      }
    };

    return recognition;
  }, [isSupported, stopHeartbeat]);

  const startListening = useCallback(() => {
    if (!isSupported) {
      setError('Speech recognition is not supported in this browser. Please use Chrome or Edge.');
      return;
    }

    console.log('🎤 Starting speech recognition...');

    // Stop any existing recognition
    if (recognitionRef.current) {
      try { 
        recognitionRef.current.stop(); 
      } catch (e) {}
      recognitionRef.current = null;
    }

    // Reset state
    finalTranscriptRef.current = '';
    lastResultTimeRef.current = Date.now();
    setTranscript('');
    setInterimTranscript('');
    setError(null);

    // Create new recognition instance
    const recognition = createRecognition();
    if (!recognition) {
      setError('Failed to create speech recognition instance.');
      return;
    }

    recognitionRef.current = recognition;
    shouldListenRef.current = true;

    try {
      recognition.start();
      setIsListening(true);
      startHeartbeat(); // Start heartbeat check
      console.log('✅ Speech recognition started successfully');
    } catch (e) {
      console.error('❌ Failed to start speech recognition:', e);
      setError('Failed to start speech recognition. Please try again or use text input.');
      setIsListening(false);
    }
  }, [isSupported, createRecognition, startHeartbeat]);

  const stopListening = useCallback(() => {
    console.log('🎤 Stopping speech recognition...');
    shouldListenRef.current = false;
    stopHeartbeat();
    
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        console.warn('⚠️ Error stopping recognition:', e);
      }
      recognitionRef.current = null;
    }
    
    setIsListening(false);
    setInterimTranscript('');
    
    console.log(`✅ Speech recognition stopped. Final transcript: ${finalTranscriptRef.current.trim().split(/\s+/).length} words`);
  }, [stopHeartbeat]);

  const resetTranscript = useCallback(() => {
    setTranscript('');
    setInterimTranscript('');
    finalTranscriptRef.current = '';
    setError(null);
    lastResultTimeRef.current = Date.now();
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopHeartbeat();
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {}
      }
    };
  }, [stopHeartbeat]);

  return {
    transcript,
    interimTranscript,
    isListening,
    startListening,
    stopListening,
    resetTranscript,
    isSupported,
    error,
    getFinalTranscript,
  };
}
