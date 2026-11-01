@echo off
title OPIc AI Mock Test Simulator
cd /d "%~dp0"
echo ========================================================
echo   OPIc AI Mock Test Simulator (Reconstructed with REA)
echo   Local Server: http://localhost:5000
echo ========================================================
start "" "http://localhost:5000"
"D:\nodejs\node.exe" -e "const http = require('http'), fs = require('fs'), path = require('path'); const mime = {'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.mp3':'audio/mpeg'}; http.createServer((req, res) => { let p = path.join(__dirname, req.url === '/' ? 'index.html' : decodeURIComponent(req.url)); if (fs.existsSync(p) && fs.statSync(p).isFile()) { res.writeHead(200, {'Content-Type': mime[path.extname(p)] || 'application/octet-stream'}); fs.createReadStream(p).pipe(res); } else { res.writeHead(404); res.end('Not Found'); } }).listen(5000, () => console.log('OPIc Mock Test is live at http://localhost:5000'));"
pause

