// import http
const http = require("http");
// import database file
const database = require("../Common_Database/database");

function teachertable(req, res){

//    GET students 
    database.query("SELECT * FROM teacher", (err, result) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Error getting students");
      } else {
        res.writeHead(200, { "Content-Type": "application/json" });
        // for data in json formate
        res.end(JSON.stringify(result.rows));
      }
  })};

