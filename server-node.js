// IMPORTING HTTP MODULE
const first = require('http');
// CREATE SERVER
let second = first.createServer((request,response)=>{
    response.write("<h1>HELLO WORLD</h1>");
    response.end();
});
// specify address and port
const address = "127.0.0.1";
const port = 4000;

// listening to port
second.listen(port,address,() => {
    console.log("server is running at http://" +address + ":" + port);
});


// *** PROGRAM 2
// // IMPORTING HTTP MODULE
// const first = require('http');
// // CREATE SERVER

// let sec = first.createServer((request,response)=>{
//     response.write("<iframe src='https://shivanifullstactdeveloper.github.io/Exercise/#contact' height='100%' width='100%'></iframe>");
//     response.end();
// });
// // specify address and port
// const address = "127.0.0.1";
// const port = 7000;
 
// 0// listening to port
// sec.listen(port,address,() => {
//     console.log("server is running at http://" +address + ":" + port);
// });


// *** PROGRAM 3
// IMPORTING HTTP MODULE
// const http = require('http');

// // import module pool
// const {pool}= require("pg");

// const db = new pool({
//     user: "demotest", //postgresSQL user
//     host: "localhoat", //posgresSQL host
//     database: "myDatabaseOne",  //postgresSQL database
//     password: "testing", //postgresSQL user  password
//     port: 5432, //postgresSQL port
// })
// // CREATE SERVER

// let server = http.createServer((request,response)=>{
//     response.setHeader("Content-Type", "text/html");
//     if(request.url ==="/students"){
//     response.write("<html");
//     response.write("<head><title>Students</title></head");
//     response.write("<body><h1>Student</h1>");
//     response.write("<ul><li>SHIVANI</li><li>POOJA</li><li>NISHA</li></ul>");
//     response.write("</body></html>");
//     return response;
//     }
//     response.write("hello node js");
//     response.end();
//     console.log("recieve request is",request)
// });
// // listening to port
// server.listen(50000,"127.0.0.1");


