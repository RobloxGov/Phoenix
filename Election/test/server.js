const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const FILE_PATH = path.join(__dirname, 'elec.json');

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/elec.json') {
        fs.readFile(FILE_PATH, (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Server Error');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(data);
        });
    } else if (req.method === 'PUT' && req.url === '/elec.json') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            fs.writeFile(FILE_PATH, body, err => {
                if (err) {
                    res.writeHead(500);
                    res.end('Server Error');
                    return;
                }
                res.writeHead(200);
                res.end();
            });
        });
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
