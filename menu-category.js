const http = require("http");
const {Pool} = require("pg");

const database = new Pool ({
    user: "firstdata",
    host:"localhost",
    database: "MyDatabaseOne",
    password: "kharpuriya",
    port: 5432
})

async function getMenu(a,b){
    const ans = await database.query("select * from menu_category");
    b.end(JSON.stringify(ans.rows));
};
let server = http.createServer((req,res)=>{
    res.setHeader("Content-Type", "text/html");
    // res.writeHead(200);
    if(req.url === "/category"){
        getMenu(req,res);
    }else{
        res.end("not found");
    }
});// 

server.listen(4003);