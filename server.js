const http = require('http');

const hostname = '127.0.0.1';
const port = 3001;

var data = {};

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  let body = [];
  req.on('error', () => {
    console.log('Error');
    res.statusCode = 500;
    res.end();
    return;
  });
  res.setHeader('Content-Type', 'application/json');

  if(req.url === '/download') {
    res.end(JSON.stringify(data));
    return;
  }
  if(req.url !== '/upload') {
    res.statusCode = 404;
    res.end();
  }
  req.on('data', (chunk) => {
    body.push(chunk);
  });

  req.on('end', () => {
    try {
      data = JSON.parse(body);
      console.log(JSON.parse(body));
    } catch(SyntaxError) {
      console.log("broken json");
    }
  });

  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
