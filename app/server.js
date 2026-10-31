const http = require('http');
const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ status: 'UP', timestamp: new Date() }));
  }

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    message: 'Automated CI/CD Microservice Deployed Successfully on Kubernetes!',
    version: '1.0.0',
    environment: 'production'
  }));
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
