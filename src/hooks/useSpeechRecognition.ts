import { useState, useCallback, useRef } from 'react';

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
  const restartCountRef = useRef(0);

  const isSupported = typeof window !== 'undefined' && 
    ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);

  // Function to get current transcript (always returns latest value)
  const getFinalTranscript = useCallback(() => {
    return finalTranscriptRef.current;
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
      let interim = '';
      
      // Process all results from this event
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        const transcript_text = result[0].transcript;
        
        if (result.isFinal) {
          // Append final result to accumulated transcript
          finalTranscriptRef.current += transcript_text + ' ';
          console.log(`🎤 [Final #${i}] "${transcript_text}" → Total: ${finalTranscriptRef.current.trim().split(/\s+/).length} words`);
          setTranscript(finalTranscriptRef.current.trim());
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
      console.log(`🎤 Recognition session ended (restart count: ${restartCountRef.current}, current transcript: ${finalTranscriptRef.current.trim().split(/\s+/).length} words)`);
      
      if (shouldListenRef.current) {
        restartCountRef.current += 1;
        
        // Small delay before restart to avoid race conditions
        setTimeout(() => {
          if (shouldListenRef.current) {
            try {
              // Try to restart the same instance
              if (recognitionRef.current) {
                console.log(`🎤 Restarting recognition session #${restartCountRef.current}... (keeping transcript: ${finalTranscriptRef.current.trim().split(/\s+/).length} words)`);
                recognitionRef.current.start();
              } else {
                throw new Error('Recognition instance is null');
              }
            } catch (e) {
              console.error('❌ Failed to restart speech recognition:', e);
              console.log('🔄 Creating new recognition instance...');
              
              // Create a new recognition instance
              // IMPORTANT: Don't reset finalTranscriptRef - keep the accumulated transcript!
              const currentTranscript = finalTranscriptRef.current;
              const newRecognition = createRecognition();
              if (newRecognition) {
                recognitionRef.current = newRecognition;
                try {
                  newRecognition.start();
                  // Sync transcript state to ensure UI shows the preserved transcript
                  setTranscript(currentTranscript.trim());
                  console.log(`✅ Created and started new recognition instance (transcript preserved: ${currentTranscript.trim().split(/\s+/).length} words)`);
                } catch (e2) {
                  console.error('❌ Failed to start new recognition:', e2);
                  setIsListening(false);
                }
              } else {
                console.error('❌ Failed to create new recognition instance');
                setIsListening(false);
              }
            }
          }
        }, 200); // Increased delay to 200ms for better stability
      } else {
        setIsListening(false);
      }
    };

    return recognition;
  }, [isSupported]);

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
    restartCountRef.current = 0;
    finalTranscriptRef.current = '';
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
      console.log('✅ Speech recognition started successfully');
    } catch (e) {
      console.error('❌ Failed to start speech recognition:', e);
      setError('Failed to start speech recognition. Please try again or use text input.');
      setIsListening(false);
    }
  }, [isSupported, createRecognition]);

  const stopListening = useCallback(() => {
    console.log('🎤 Stopping speech recognition...');
    shouldListenRef.current = false;
    
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
  }, []);

  const resetTranscript = useCallback(() => {
    setTranscript('');
    setInterimTranscript('');
    finalTranscriptRef.current = '';
    setError(null);
    restartCountRef.current = 0;
  }, []);

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
