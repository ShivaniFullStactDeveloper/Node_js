
const express = require("express");
const database = require("./database");

const app = express();
const PORT = 3800;

// middleware to read JSON
app.use(express.json());

/* ------ GET students ---------- */
app.get("/students", (req, res) => {
  database.query("SELECT * FROM student", (err, result) => {
    if (err) {
      return res.status(500).send("Error getting students");
    }
    res.json(result.rows);
  });
});

/* ---------- POST students (MULTIPLE) ---------- */
app.post("/student", (req, res) => {
    const students = req.body; // array
  
    students.forEach(student => {
      database.query(
        `INSERT INTO student
        (student_name, roll_no, date_of_birth, gender, contact_no, email, address, institute_id, class_id)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
        [
          student.student_name,
          student.roll_no,
          student.date_of_birth,
          student.gender,
          student.contact_no,
          student.email,
          student.address,
          student.institute_id,
          student.class_id
        ],
        (err) => {
          if (err) {
            console.error(err.message);
          }
        }
      );
    });
  
    res.status(201).send("Students saved successfully");
  });

// UPDATE student
app.put("/student/:id", (req, res) => {

    const id = req.params.id;   
    const student = req.body; 
  
    const query = `
      UPDATE student SET
        student_name = $1,
        roll_no = $2,
        date_of_birth = $3,
        gender = $4,
        contact_no = $5,
        email = $6,
        address = $7,
        institute_id = $8,
        class_id = $9
      WHERE student_id = $10
    `;
  
    const values = [
      student.student_name,
      student.roll_no,
      student.date_of_birth,
      student.gender,
      student.contact_no,
      student.email,
      student.address,
      student.institute_id,
      student.class_id,
      id
    ];
  
    database.query(query, values, (err, result) => {
      if (err) {
        return res.status(500).send("Error updating student");
      }
  
      if (result.rowCount === 0) {
        return res.status(404).send("Student not found");
      }
  
      res.send("Student updated successfully");
    });
  });
  

  /* ---------- DELETE student ---------- */
app.delete("/student/:id", (req, res) => {
    const id = req.params.id;
  
    database.query(
      "DELETE FROM student WHERE student_id = $1",
      [id],
      err => {
        if (err) {
          return res.status(500).send("Error deleting student");
        }
        res.send("Student deleted successfully");
      }
    );
  });
  