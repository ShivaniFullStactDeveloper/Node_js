// server.js
const http = require("http");
const database = require("./database");

const server = http.createServer((req, res) => {

  /* ---------- GET students ---------- */
  if (req.method === "GET" && req.url === "/students") {

    database.query("SELECT * FROM student_table", (err, result) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Error getting students");
      } else {
        res.writeHead(200, { "Content-Type": "application/json" });
        // for data in json formate
        res.end(JSON.stringify(result.rows));
      }
    });
  }

  /* ---------- POST student ---------- */
  else if(req.method === "POST" && req.url === "/student") {

    let body = "";

    req.on("data", chunk => {
      body += chunk;
    });

    req.on("end", () => {
      const student = JSON.parse(body);

      database.query(
        "INSERT INTO student_table (student_name, student_rollno, student_class,date_of_birth, gender ,phone_no, email_id ,address , admission_date) VALUES ($1,$2,$3,$4, $5, $6, $7, $8, $9)",
        [student.student_name, student.student_rollNo, student.student_class, student.date_of_birth, student.gender, student.phone_no, student.email_id, student.address, student.admission_date],
        (err) => {
          if (err) {
            res.writeHead(500);
            res.end("Error saving student");
          } else {
            res.writeHead(201);
            res.end("Student saved successfully");
          }
        }
      );
    });
  }

   /* ---------- PUT student (UPDATE) ---------- */
   else if (req.method === "PUT" && req.url.startsWith("/student/")) {

    const id = req.url.split("/")[2]; // student_id
    let body = "";
  
    req.on("data", chunk => body += chunk);
  
    req.on("end", () => {
      const student = JSON.parse(body);
  
      database.query(
        `UPDATE student_table SET
          student_name = $1,
          student_rollno = $2,
          student_class = $3,
          date_of_birth = $4,
          gender = $5,
          phone_no = $6,
          email_id = $7,
          address = $8,
          admission_date = $9
         WHERE student_id = $10`,
        [
          student.student_name,
          student.student_rollNo,
          student.student_class,
          student.date_of_birth,
          student.gender,
          student.phone_no,
          student.email_id,
          student.address,
          student.admission_date,
          id
        ],
        (err, result) => {
          if (err) {
            res.writeHead(500);
            res.end("Error updating student");
          } 
          else if (result.rowCount === 0) {
            res.writeHead(404);
            res.end("Student not found");
          } 
          else {
            res.writeHead(200);
            res.end("Student updated successfully");
          }
        }
      );
    });
  }
  

  /* ---------- DELETE student ---------- */
  else if (req.method === "DELETE" && req.url.startsWith("/student/")) {

    const id = req.url.split("/")[2];

    database.query(
      "DELETE FROM student_table WHERE student_id=$1",
      [id],
      (err) => {
        if (err) {
          res.writeHead(500);
          res.end("Error deleting student");
        } else {
          res.writeHead(200);
          res.end("Student deleted successfully");
        }
      }
    );
  }

  /* ---------- Default ---------- */
  else {
    res.writeHead(200);
    res.end("Serve is running");
  }
});

server.listen(3900, () => {
  console.log("Server running on port 3900");
});
