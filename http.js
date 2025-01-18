const http = require('http');
const https = require('https');
const net = require('net');
const url = require('url');

const PORT = 1212;

// HTTP Proxy
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url);
  
  const options = {
    hostname: parsedUrl.hostname,
    port: parsedUrl.port || 80,
    path: parsedUrl.path,
    method: req.method,
    headers: req.headers
  };

  const proxy = http.request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res);
  });

  proxy.on('error', (err) => {
    res.writeHead(500);
    res.end(`Error: ${err.message}`);
  });

  req.pipe(proxy);
});

// HTTPS Tunneling
server.on('connect', (req, clientSocket, head) => {
  const { port, hostname } = url.parse(`//${req.url}`, false, true);

  const serverSocket = net.connect(port || 443, hostname, () => {
    clientSocket.write('HTTP/1.1 200 Connection Established\r\n\r\n');
    serverSocket.write(head);
    serverSocket.pipe(clientSocket);
    clientSocket.pipe(serverSocket);
  });

  serverSocket.on('error', (err) => {
    clientSocket.end(`HTTP/1.1 500 ${err.message}\r\n`);
  });
});

server.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
