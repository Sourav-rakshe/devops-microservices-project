const http = require('http');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({
    message: "Automated CI/CD Microservice Deployed Successfully on Kubernetes!",
    version: "2.0.0",
    release: "v2-feature-update",
    environment: "production"
  }));
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
