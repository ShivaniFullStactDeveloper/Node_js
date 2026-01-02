// import http
const http = require("http");
// import database file
const database = require("../Common_Database/database");

const server = http.createServer((req, res) => {

//    GET students 
  if (req.method === "GET" && req.url === "/students") {

    database.query("SELECT * FROM student", (err, result) => {
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
//    GET institutes 
  else if (req.method === "GET" && req.url === "/institutes") {

    database.query("SELECT * FROM institute", (err, result) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Error getting institutes");
      } else {
        res.writeHead(200, { "Content-Type": "application/json" });
        // for data in json formate
        res.end(JSON.stringify(result.rows));
      }
    });
  }
//    GET franchises 
  else if (req.method === "GET" && req.url === "/franchises") {

    database.query("SELECT * FROM franchise", (err, result) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Error getting franchises");
      } else {
        res.writeHead(200, { "Content-Type": "application/json" });
        // for data in json formate
        res.end(JSON.stringify(result.rows));
      }
    });
  }
//    GET classes 
  else if (req.method === "GET" && req.url === "/classes") {

    database.query("SELECT * FROM classes", (err, result) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Error getting classes");
      } else {
        res.writeHead(200, { "Content-Type": "application/json" });
        // for data in json formate
        res.end(JSON.stringify(result.rows));
      }
    });
  }


//    POST student 
  else if(req.method === "POST" && req.url === "/student") {

    let body = "";

    req.on("data", chunk => {
      body += chunk;
    });

    req.on("end", () => {
      const students = JSON.parse(body);

      students.forEach(student => {
      database.query(
        "INSERT INTO student(student_name, roll_no ,date_of_birth, gender ,contact_no, email ,address , institute_id, class_id) VALUES ($1,$2,$3,$4, $5, $6, $7, $8, $9 )",
        [ student.student_name, student.roll_no, student.date_of_birth, student.gender, student.contact_no, student.email, student.address, student.institute_id, student.class_id],
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
});
}
//   POST franchise 
  else if(req.method === "POST" && req.url === "/franchise") {

    let body = "";

    req.on("data", chunk => {
      body += chunk;
    });

    req.on("end", () => {
      const franchises = JSON.parse(body);

      franchises.forEach(franchise => {
      database.query(
        "INSERT INTO franchise (franchise_name) VALUES ($1)",
        [franchise.franchise_name],
        (err) => {
          if (err) {
            res.writeHead(500);
            res.end("Error saving franchise");
          } else {
            res.writeHead(201);
            res.end("Franchise saved successfully");
          }
        }
      );
    });
});
  }
//    POST Institute 
    else if(req.method === "POST" && req.url === "/institute") {

        let body = "";
    
        req.on("data", chunk => {
          body += chunk;
        });
    
        req.on("end", () => {
          const institutes = JSON.parse(body);
    
          institutes.forEach(institute => {
          database.query(
            "INSERT INTO institute (institute_name, franchise_id) VALUES ($1,$2)",
            [institute.institute_name, institute.franchise_id],
            (err) => {
              if (err) {
                res.writeHead(500);
                res.end("Error saving institute");
              } else {
                res.writeHead(201);
                res.end("Institute saved successfully");
              }
            }
          );
        });
    });
      }
      // POST classes 
  else if(req.method === "POST" && req.url === "/class") {

    let body = "";

    req.on("data", chunk => {
      body += chunk;
    });

    req.on("end", () => {
      const classes = JSON.parse(body);

      classes.forEach(classe => {
      database.query(
        "INSERT INTO classes (class_name) VALUES ($1)",
        [classe.class_name],
        (err) => {
          if (err) {
            res.writeHead(500);
            res.end("Error saving classes");
          } else {
            res.writeHead(201);
            res.end("Classes saved successfully");
          }
        }
      );
    });
});
  }
  
    // PUT student (UPDATE) 
     else if (req.method === "PUT" && req.url.startsWith("/student/")) {

        const id = req.url.split("/")[2]; // student_id
        let body = "";
      
        req.on("data", chunk => body += chunk);
      
        req.on("end", () => {
          const student = JSON.parse(body);
      
          database.query(
            `UPDATE student SET
              student_name = $1,
              rollno = $2,
              date_of_birth = $3,
              gender = $4,
              contact_no = $5,
              email = $6,
              address = $7,
              institute_id = $8,
              class_is = $9,
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
      
//    DELETE student 
  else if (req.method === "DELETE" && req.url.startsWith("/student/")) {

    const id = req.url.split("/")[2];

    database.query(
      "DELETE FROM student WHERE student_id=$1",
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

//    GET students with JOIN 
else if (req.method === "GET" && req.url === "/students/join") {

    const joinQuery = `
      SELECT
        s.student_id,
        s.student_name,
        s.roll_no,
        s.gender,
        s.date_of_birth,
        s.contact_no,
        s.email,
        s.address,
        c.class_name,
        i.institute_name,
        f.franchise_name
      FROM student s
      JOIN classes c ON s.class_id = c.class_id
      JOIN institute i ON s.institute_id = i.institute_id
      JOIN franchise f ON i.franchise_id = f.franchise_id
    `;
  
    database.query(joinQuery, (err, result) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Error fetching joined student data");
      } else {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(result.rows));
      }
    });
  }
  
//  Default   
  else {
    res.writeHead(200);
    res.end("Serve is running");
  }
});

server.listen(3800, () => {
  console.log("Server running on port 3900");
});
