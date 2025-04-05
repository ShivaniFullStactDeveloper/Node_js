const {StudentHandler} =  require("./module-test-node")
const http = require("http");
const server = http.createServer(StudentHandler);
server.listen(3001, () => {
    console.log("server running");
});
// server.listen(32000);