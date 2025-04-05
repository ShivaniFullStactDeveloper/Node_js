const arith = require("./module-test-node");
const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.write("<h1>hello hii</h1>");
  res.write("hii")
  res.end();

  console.log(arith.sayhello(), arith.add(1, 2), arith.sub(5, 3));
});

server.listen = (5001,"127.0.0.1");

// const PORT = 5001; // Change this to a different port, e.g., 5001

// const arith = require("./module-test-node");
// const http = require("http")

// const server = http.createServer((req, res) => {
//   res.writeHead(200, { "Content-Type": "text/plain" });
//   res.write("<h1>Hello World</h1>");
//   res.end();
//   console.log(arith.sayhello(), arith.add(1, 2), arith.sub(4, 2));
// });

// server.listen(5000);
