@echo off
title OPIc AI Mock Test Simulator
cd /d "%~dp0"
echo ========================================================
echo   OPIc AI Mock Test Simulator (Reconstructed with REA)
echo   Local Server: http://localhost:5000
echo ========================================================
start "" "http://localhost:5000"
"D:\nodejs\node.exe" -e "const http = require('http'), fs = require('fs'), path = require('path'); const mime = {'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.jpg':'image/jpeg','.mp3':'audio/mpeg','.json':'application/json'}; http.createServer((req, res) => { const urlPath = req.url.split('?')[0]; let p = path.join(__dirname, urlPath === '/' ? 'index.html' : decodeURIComponent(urlPath)); if (fs.existsSync(p) && fs.statSync(p).isFile()) { res.writeHead(200, {'Content-Type': mime[path.extname(p)] || 'application/octet-stream', 'Access-Control-Allow-Origin': '*'}); fs.createReadStream(p).pipe(res); } else { res.writeHead(404); res.end('Not Found: ' + urlPath); } }).listen(5000, '0.0.0.0', () => console.log('OPIc Mock Test is live at http://localhost:5000'));"
pause
