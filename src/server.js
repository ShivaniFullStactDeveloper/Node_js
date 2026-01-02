const http = require("http");
const studentRoutes = require("./routes/studentRoute");

const server = http.createServer((req, res)=>{

  const handled = studentRoutes(req, res);

  if (!handled) {
    res.writeHead(200);
    res.end("Server is running");
  }
});

server.listen(3800, function () {
  console.log("Server running on port 3800");
});