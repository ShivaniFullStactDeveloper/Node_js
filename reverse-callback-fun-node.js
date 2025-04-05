// program 1
function myFunction(a){
    return 1000;
    return 200;
}
let a = myFunction()
let b = myFunction()

console.log("THE VALUE OF a =" + a + "& value of b=" + b);

// program 2
// function addTwoNumber(x,y){
//     return x+y;
// }

// let z = addTwoNumber(10,20);
// console.log("the value of z is" + z);

// program 3
// function addTwoNumber(x,y, action){
//     if(action == "add"){
//         return x+y;
//     }else if(action == "sub"){
//         return x-y;
//     } else if(action == "multi"){
//         return x*y;
//     }else if(action == "div"){
//         return x/y;
//     } 

// }
// let z = addTwoNumber(10,20, "div" );
// console.log("the value of z is" + z);

// program 4
// function reverseFunction(str){
//     let x = str.split("");
//     let y =  x.reverse();
//     let z = y.join("")
//     console.log(z);
// }
// reverseFunction("shivani");

// program 5
// function reverseString(str, abc){
//     let x =  str.split("").reverse().join("");
//     console.log(x);
//     if(abc){
//         abc(x);
//     }
//  }
// function reverseNo(x){
//     console.log("the name is ="+x);

//  }
// reverseString("shivani",reverseNo);

// program 6 /* method 1
// function callBackFunction(x){
//     x(100);
// }
// function actionFunction(y){
//     console.log(y);
// }
// callBackFunction(actionFunction);  // 100

// program 6 /* method 2
// function callBackFunction(x){
//     x(100);
// }
// callBackFunction(function actionFunction(y){
//     console.log(y);
// });

// program 6 /* method 3(anonymous function mostly used this type)
// function callBackFunction(x){
//     x(100);
// }
// callBackFunction((y)=>{
//     let a = 10;
//     let b = 20;
//     console.log("the value of y is"+y + "&", + a+b);
// });