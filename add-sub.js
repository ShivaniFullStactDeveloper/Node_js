
const http = require("http");
const url = require("url");

function isNaturalNumber(num) {
    return Number.isInteger(num) && num > 0;
}

function calculate(req, res) {
    const query = url.parse(req.url, true).query;

    if (req.url.startsWith("/add")) {
        const { a, b } = query;
        const result = Number(a) + Number(b);
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(`<h1>Addition Result: ${result}</h1>`);
    } else if (req.url.startsWith("/sub")) {
        const { a, b } = query;
        const result = Number(a) - Number(b);
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(`<h1>Subtraction Result: ${result}</h1>`);
    } else if (req.url.startsWith("/mul")) {
        const { a, b } = query;
        const result = Number(a) * Number(b);
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(`<h1>Multiplication Result: ${result}</h1>`);
    } else if (req.url.startsWith("/div")) {
        const { a, b } = query;
        if (Number(b) === 0) {
            res.writeHead(400, { "Content-Type": "text/html" });
            return res.end(`<h1>Error: Division by zero is not allowed.</h1>`);
        }
        const result = Number(a) / Number(b);
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(`<h1>Division Result: ${result}</h1>`);
    } else if (req.url.startsWith("/is-natural")) {
        const { number } = query;
        const result = isNaturalNumber(Number(number));
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(`<h1>${number} is ${result ? "" : "not "}a natural number.</h1>`);
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

const PORT = 3001;
server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});



// const http = require("http");
// const url = require("url");

// // function isNaturalNumber(num) {
// //     return Number.isInteger(num) && num > 0;
// // }

// function calculate(req, res) {
//     // const query = url.parse(req.url, true).query;

//     // if (req.url === "/") {
//     //     // Serve the main form
//     //     res.writeHead(200, { "Content-Type": "text/html" });
//     //     res.end(`
//     //         <h1>Arithmetic Operations</h1>
//     //         <form action="/add, /sub, /mul, /div, /is-natural" method="GET">
//     //             <input type="number" name="a" placeholder="Enter first number" required />
//     //             <input type="number" name="b" placeholder="Enter second number" required />
//     //             <button type="submit">Add</button>
//     //         </form>
          
//     //     `);
//     if (req.url.startsWith("/add")) {
//         res.writeHead(200, { "Content-Type": "text/html" });
//         res.end(`
//             <h1>Arithmetic Operations</h1>
//             <form action="/add, /sub, /mul, /div, /is-natural" method="GET">
//                 <input type="number" name="a" placeholder="Enter first number" required />
//                 <input type="number" name="b" placeholder="Enter second number" required />
//                 <button type="submit">Add</button>
//             </form>
          
//         `);
//         const { a, b } = query;
//         const result = Number(a) + Number(b);
//         res.writeHead(200, { "Content-Type": "text/html" });
//         res.end(`<h1>Addition Result: ${result}</h1><a href="/">Back</a>`);
//     } else if (req.url.startsWith("/sub")) {
//         const { a, b } = query;
//         const result = Number(a) - Number(b);
//         res.writeHead(200, { "Content-Type": "text/html" });
//         res.end(`<h1>Subtraction Result: ${result}</h1><a href="/">Back</a>`);
//     } else if (req.url.startsWith("/mul")) {
//         const { a, b } = query;
//         const result = Number(a) * Number(b);
//         res.writeHead(200, { "Content-Type": "text/html" });
//         res.end(`<h1>Multiplication Result: ${result}</h1><a href="/">Back</a>`);
//     } else if (req.url.startsWith("/div")) {
//         const { a, b } = query;
//         if (Number(b) === 0) {
//             res.writeHead(400, { "Content-Type": "text/html" });
//             return res.end(`<h1>Error: Division by zero is not allowed.</h1><a href="/">Back</a>`);
//         }
//         const result = Number(a) / Number(b);
//         res.writeHead(200, { "Content-Type": "text/html" });
//         res.end(`<h1>Division Result: ${result}</h1><a href="/">Back</a>`);
//     } else if (req.url.startsWith("/is-natural")) {
//         const { number } = query;
//         const result = isNaturalNumber(Number(number));
//         res.writeHead(200, { "Content-Type": "text/html" });
//         res.end(`<h1>${number} is ${result ? "" : "not "}a natural number.</h1><a href="/">Back</a>`);
//     } else {
//         res.writeHead(404, { "Content-Type": "text/html" });
//         res.end(`<h1>404 Not Found</h1>`);
//     }
// }

// const server = http.createServer((req, res) => {
//     if (req.method === "GET") {
//         calculate(req, res);
//     } else {
//         res.writeHead(405, { "Content-Type": "text/html" });
//         res.end(`<h1>Method Not Allowed</h1>`);
//     }
// });

// // const PORT = 4000;
// // server.listen(PORT, () => {
// //     console.log(`Server is running at http://localhost:${PORT}`);
// // });
// server.listen=3000;