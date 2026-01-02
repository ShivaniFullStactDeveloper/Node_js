const studentService = require("../services/studentQuery");

//   POST or CREATE student

function createStudent(req, res) {
    let body = "";
  
    // request data read
    req.on("data", (chunk) => {
      body = body + chunk;
    });
  
    // after full data
    req.on("end", () => {
      const student = JSON.parse(body);
  
      studentService.createStudent(student ,(err) => {
        if (err) {
          res.writeHead(500);
          res.end("Error saving student");
        } else {
          res.writeHead(201);
          res.end("Student saved successfully");
        }
      });
    });
  }
  

//      GET students

function getStudents(req, res) {

  studentService.getStudents( (err, result) =>{
    if (err) {
      res.writeHead(500);
      res.end("Error getting students");
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(result.rows));
    }
  });

}



//    PUT or UPDATE student

function updateStudent(req, res) {
  const id = req.url.split("/")[2];
  let body = "";

  req.on("data", (chunk) => {
    body = body + chunk;
  });

  req.on("end", () => {
    const student = JSON.parse(body);

    studentService.updateStudent(id, student, function (err, result) {
      if (err) {
        res.writeHead(500);
        res.end("Error updating student");
      } else if (result.rowCount === 0) {
        res.writeHead(404);
        res.end("Student not found");
      } else {
        res.writeHead(200);
        res.end("Student updated successfully");
      }
    });
  });
}

/*
  DELETE /student/:id
*/
function deleteStudent(req, res) {
  const id = req.url.split("/")[2];

  studentService.deleteStudent(id, (err) => {
    if (err) {
      res.writeHead(500);
      res.end("Error deleting student");
    } else {
      res.writeHead(200);
      res.end("Student deleted successfully");
    }
  });
}

// export controller functions
module.exports = {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent
};
