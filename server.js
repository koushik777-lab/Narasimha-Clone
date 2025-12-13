const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 5000;
const DIRECTORY = __dirname;

const MIMETYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
    // Prevent caching
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Normalize path
    let requestPath = req.url === '/' ? '/index.html' : req.url;
    // Remove query string if any
    requestPath = requestPath.split('?')[0];

    // Prevent directory traversal
    const safePath = path.normalize(requestPath).replace(/^(\.\.[\/\\])+/, '');
    const filePath = path.join(DIRECTORY, safePath);

    fs.readFile(filePath, (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 Not Found</h1>');
            } else {
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            const ext = path.extname(filePath).toLowerCase();
            const contentType = MIMETYPES[ext] || 'application/octet-stream';

            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        }
    });
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Serving at http://0.0.0.0:${PORT}`);
});
