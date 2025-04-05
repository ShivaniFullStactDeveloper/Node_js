function add(a,b){
    console.log(a+b);
}

function sub(a,b){
    console.log(a-b);
}

function sayhello(){
    console.log("hello");
};


// *******
function StudentHandler(req, res){
    // function StudentHandler(){
//     (req, res) => {
      
        if (req.url === "/students") {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write("<html");
            res.write("<head><title>Students</title></head");
            res.write(`<body><h1 style="color:blue;">Student</h1>`);
            res.write("<ul><li>SHIVANI</li><li>POOJA</li><li>priya</li></ul>");
        res.write("</body></html>");
            return res.end();
        }
      
        else if(req.url==="/create-student" && req.method === "POST"){
            let body="";
            req.on("data" , (chunk)=>{
                body = body + chunk.toString();
                // body += chunk.toSring();
                console.log(body);
            });
    
            req.on("end" , ()=>{
                console.log("data student =" + body);
        
                // response
                res.writeHead(200, { "Content-Type": "text/html" });
                res.write("<html");
                res.write("<head><title>Students</title></head");
                res.write(`<body><h1 style="color:blue;">${body} YOUR INPUT IS SUBMITED</h1>`);
                res.write("</body></html>");
                return res.end();
    
            });
    
            req.on("error" , (err)=>{
                res.writeHead(400, { "Content-Type": "text/html" });
                console.log("404");
            });
        }
            else if(req.url ==="/"){
                res.writeHead(200, { "Content-Type": "text/html" });
                res.write(`<form action="/create-student" method="POST">
                    <input type="text" name="username" placeholder="username"/>
                    <input type="password" name"password" placeholder="password"/>
                    <button type="submit" style="">Submit</button></form>`);
                // res.write(`<input type="text" placeholder="username"/><input type="number" placeholder="password"/><button style="">Submit</button>`);
                return res.end();
            }
        else{
            res.writeHead(400, { "Content-Type": "text/html" });
            res.write("<html");
            res.write("<head><title>Students</title></head"); 
            res.write(`<body><h1>NOT FOUND</h1>`);
            res.write("</body></html>");
            return res.end();

        }
      
    };


module.exports = {
    add,
    sub,
    sayhello,
    StudentHandler
};