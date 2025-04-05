// const fs= require("fs")

// console.log("step one")

// // BlOCKING CODE - synechrons code (step by step run)
// // const data = fs.readFileSync("demo.txt");
// // console.log(data.toString());

// // NON BlOCKING CODE - asynechronized code 
// fs.readFile("file.txt", (err, data) => {
//     if(err){
//         console.log(err);
//     }else{
//         console.log(data.toString());
//     }
// })
// console.log("step two");
// console.log("step three");


// *** PROGRAM 2
// const fs= require("fs")

// console.log("step one")

// fs.writeFile("shiv.txt", "i love coding",()=>{
//     console.log("file created");
// });
// // BlOCKING CODE - synechrons code (step by step run)
// try{
// const data = fs.writeFile("demo.txt");
// console.log(data.toString());
// }catch(err){
//     console.log(err);
// };

// // // NON BlOCKING CODE - asynechronized code 
// // fs.readFile("shiv.txt", (err, data) => {
// //     if(err){
// //         console.log(err);
// //     }else{
// //         console.log(data.toString());
// //     }
// // })
// console.log("step two");
// console.log("step three");



// **** PROGRAM 3(SHOW HOW MANY CPU ATTACH IN YOUR COMPUTER)
const os = require("os");
console.log(os.cpus().length);
