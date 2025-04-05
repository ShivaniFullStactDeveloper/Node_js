// IMPORTING HTTP MODULE
const http = require('http');

// import module pool
const {Pool}= require("pg");

const db = new Pool({
    user: "demotest", //postgresSQL user
    host: "localhost", //posgresSQL host
    database: "MyDatabaseOne",  //postgresSQL database
    password: "testing", //postgresSQL user  password
    port: 5432 //postgresSQL port
});
// CREATE SERVER
async function getMenuList(req,res){     
    const result = await db.query("select * from hotel-menu");
    res.end(JSON.stringify(result.rows));
    //req store request and res store response
    // return res.end("menu list found")
}

let server = http.createServer((request,response)=>{
    response.setHeader("Content-Type", "text/html");
    if(request.url ==="/menu"){
        getMenuList(request,response)
    
    }else{
        response.end("menu list not found")
    }
   
});
// listening to port
server.listen(5001,"127.0.0.1", ()=>{
    console.log("server is running on port 50000");
});

// // IMPORTING HTTP MODULE
// const http = require('http');

// // import module pool
// const { Pool } = require("pg");

// const db = new Pool({
//     user: "demotest", // postgresSQL user
//     host: "localhost", // postgresSQL host
//     database: "MyDatabaseOne",  // postgresSQL database
//     password: "testing", // postgresSQL user password
//     port: 5432 // postgresSQL port
// });

// // CREATE SERVER
// async function getMenuList(req, res) {
//     try {
//         const result = await db.query("SELECT * FROM hotel_menu");
//         res.end(JSON.stringify(result.rows)); // corrected typo: JSON.stringfy -> JSON.stringify
//         console.log(result.rows)
//     } catch (err) {
//         console.error("Database query error:", err);
//         res.statusCode = 500;
// }
// }

// let server = http.createServer((request, response) => {
//     response.setHeader("Content-Type", "text/html");
//     if (request.url === "/menu") {
//         getMenuList(request, response);
//     } else {
//         response.end("Menu list not found");
//     }
// });

// // listening to port
// const PORT = 4000;
// const HOST = "127.0.0.1";
// server.listen(PORT, HOST, () => {
//     console.log(`Server is running on http://${HOST}:${PORT}`);
// });