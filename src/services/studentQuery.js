// const database = require("../models/db");

// // Get all students
// function getAllStudents(req , res) {
//     database.query("SELECT * FROM student", (err, result) => {
//         if (err) {
//           res.writeHead(500, { "Content-Type": "text/plain" });
//           res.end("Error getting students");
//         } else {
//           res.writeHead(200, { "Content-Type": "application/json" });
//           // for data in json formate
//           res.end(JSON.stringify(result.rows));
//         }
//       });
// }

// // Function: insert student
// function createStudent(req , res) {
//     let body = "";

//     req.on("data", chunk => {
//       body += chunk;
//     });

//     req.on("end", () => {
//       const students = JSON.parse(body);

//       students.forEach(student => {
//       database.query(
//         "INSERT INTO student(student_name, roll_no ,date_of_birth, gender ,contact_no, email ,address , institute_id, class_id) VALUES ($1,$2,$3,$4, $5, $6, $7, $8, $9 )",
//         [ student.student_name, student.roll_no, student.date_of_birth, student.gender, student.contact_no, student.email, student.address, student.institute_id, student.class_id],
//         (err) => {
//           if (err) {
//             res.writeHead(500);
//             res.end("Error saving student");
//           } else {
//             res.writeHead(201);
//             res.end("Student saved successfully");
//           }
//         }
//       );
//     });
// });
// }

// // Function: delete student
// function deleteStudent(id, callback) {
//     database.query(
//     "DELETE FROM student WHERE student_id = $1",
//     [id],
//     callback
//   );
// }

// // Functions export
// module.exports = {
//   getAllStudents,
//   createStudent,
//   deleteStudent
// };


// database connection import
const database = require("../models/batabase");


//     GET all students

function getStudents(callback) {
  database.query(
    "SELECT * FROM student",
   (err, result) => {
    callback (err, result);
    }
  );
}


//   INSERT new student

function createStudent(student,callback) {
  database.query(
    "INSERT INTO student (student_name, roll_no, gender) VALUES ($1,$2,$3)",
    [
      student.student_name,
      student.roll_no,
      student.gender
    ],
   (err, result) => {
    callback (err, result);
    }
  );
}

/*
  UPDATE student
*/
function updateStudent(id, student,callback) {
  database.query(
    "UPDATE student SET student_name=$1, roll_no=$2, gender=$3 WHERE student_id=$4",
    [
      student.student_name,
      student.roll_no,
      student.gender,
      id
    ],
    (err, result) => {
      callback (err, result);
    }
  );
}

/*
  DELETE student
*/
function deleteStudent(id,callback) {
  database.query(
    "DELETE FROM student WHERE student_id=$1",
    [id],
    (err, result) =>{
      callback (err, result);
    }
  );
}

// export all functions
module.exports = {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent
};
