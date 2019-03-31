const http = require('http');

let userList = [];

const server = http.createServer((req, res) => {
  const url = req.url;
  if (url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>basic 38 chacha</title></head>');
    res.write('<body><ul>Hello World</ul>');
    res.write(
      '<body><form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Input UserName</button></form></body>'
    );
    res.write(
      '<body><form action="/userList" method="POST"><button type="submit">UserList</button></form></body>'
    );
    res.write(
      '<body><form action="/Google" method="POST"><button type="submit">Google</button></form></body>'
    );
    res.write('</html>');
    return res.end();
  }
  if (url === '/userList') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>basic 38 chacha UserList</title></head>');
    res.write('<body><ul>UserList</ul></body>');
    if(userList.length !== 0){
      userList.forEach( (userName) => {
        res.write(`<body><ul><li>${userName}</li></ul></body>`);
      });
    }
    res.write(
      '<body><form action="/" method="POST"><button type="submit">To The Main</button></form></body>'
    );
    res.write('</html>');
    return res.end();
  }
  // Send a HTML response with some "Page not found text
  if (url === '/create-user') {
    const body = [];
    req.on('data', chunk => {
      body.push(chunk);
    });
    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      userList.push(parsedBody.split('=')[1]);
      console.log(userList);
    });
    res.statusCode = 302;
    res.setHeader('Location', '/');
    res.end();
  }

  if (url === '/Google') {
  
    res.statusCode = 302;
    res.setHeader('Location', 'https://www.google.co.kr/');
    res.end();
  }

});

server.listen(3000);
console.log('-----------------------------------------');
console.log('The server is listening on the port 3000');
console.log('go to http://localhost:3000/ (ctrl + click this url)');
console.log('-----------------------------------------');
