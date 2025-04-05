// program 1
// x = 2;
// y = 4;
// console.log("addition is" , x+y);
// console.log("subtraction is :",x-y);
// console.log("multiplicatin is :",x*y);
// console.log("division is :",x/y);
// console.log("modulas is :",x%y);


// program 2 add , sub , into , div
// x= 30;
// y= 20;
// z= x/y;
// console.log(z);

// program 3 / even or odd
// // x= 13;
// x=12;
// if(x % 2 == 0){
//     console.log("the no is even");
// }else{
//     console.log("the no is odd");
// };

// program 4 
// a=5;
// b=8
// console.log(a>b);
// console.log(a<b);
// console.log(a>=b);
// console.log(a<=b);
// console.log(a==b);
// console.log(a!=b);

// program 5
// var color = 'green';

// switch (color) {

//     case 'black':

//         console.log('black');

//         break;

//     case 'green':

//         console.log('green');

//         break;

//     case 'white':

//         console.log('white');

//         break;
// }

// program 6
// for(let i=1; i<=10; i++){

//     console.log(i*2);
// };

// program 7 **drow table
// let i=1;

// while(i<=10){
//     output=i*3;
//     console.log(output);
//   i++;
// };


// program 8  /print star*
// Function to print a right-angled triangle of stars
function printStarTriangle(rows) {
    for (let i = 1; i <= rows; i++) {
        let stars =' ';
        for (let j = 1; j <= i; j++) {
            stars += ' * ';
        }
        console.log(stars);
    }
}
// Number of rows for the star triangle
const numberOfRows = 5; // You can change this to print more or fewer rows

printStarTriangle(numberOfRows);

// program 9

// for(int i=1; i<=5; i++){
//     for(int j=1; j<=9; j++){
//         if((j==6-1)||(i==3 && j>=3 && j<=7)||(i ==4+i)){
//             console.log("*");
//         }else{
//             console.log(" ");
//         }
// }
// console.log();
// }

// for (let i = 1; i <= 5; i++) {
//     let row = ''; // Create a string to hold the row output
//     for (let j = 1; j <= 9; j++) {
//         // Check the conditions for printing stars
//         if ((j === 6 - 1) || (i === 3 && j >= 3 && j <= 7) || (i === 4 && j === 5)) {
//             row += '*'; // Add star to the row string
//         } else {
//             row += ' '; // Add space to the row string
//         }
//     }
//     console.log(row); // Print the constructed row
// }