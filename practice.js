const http = require("http")
const  url = require("url")

// const first = http.createServer((req, res)=>{
//     res.writeHead(200, {"Content-Type": "text/plain"})

function calculate(req, res) {
    const query = url.parse(req.url, true).query;

    if (req.url === "/") {
        // Serve the main form
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(`
            <h1>Arithmetic Operations</h1>
            <form action="/add" method="GET">
                <input type="number" name="a" placeholder="Enter first number" required />
                <input type="number" name="b" placeholder="Enter second number" required />
                <button type="submit">Add</button>
              
            </form>
                <form action="/sub" method="GET">
                <button type="submit">sub</button>
            </form>
                <form action="/mul" method="GET">
                <button type="submit">mul</button>
            </form>
                <form action="/div" method="GET">
                <button type="submit">div</button>
            </form>
        `)
res.end();
    }
    else if (req.url.startsWith("/add")) {
        const { a, b } = query;
        const result = Number(a) + Number(b);
        
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(`<h1>Addition Result: ${result}</h1><a href="/">Back</a>`);
        

    }
    else if (req.url.startsWith("/div")) {
        const { a, b } = query;
        const result = Number(a) / Number(b);
        
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(`<h1>Addition Result: ${result}</h1><a href="/">Back</a>`);
        

    }
    else if (req.url.startsWith("/sub")) {
        const { a, b } = query;
        const result = Number(a) - Number(b);
        
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(`<h1>Addition Result: ${result}</h1><a href="/">Back</a>`);
        

    }
    else if (req.url.startsWith("/mul")) {
        const { a, b } = query;
        const result = Number(a) * Number(b);
        
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(`<h1>Addition Result: ${result}</h1><a href="/">Back</a>`);
        

    } else {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end(`<h1>404 Not Found</h1>`);
    }
}

const server = http.createServer((req, res) => {
    if (req.method === "GET") {
        calculate(req, res);
    } else {
        res.writeHead(405, { "Content-Type": "text/html" });
        res.end(`<h1>Method Not Allowed</h1>`);
    }
});

const PORT = 4000;
server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
