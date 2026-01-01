
const express = require("express");
const database = require("./database");

const app = express();
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

/* ----- GET institutes ---------- */
app.get("/institutes", (req, res) => {
  database.query("SELECT * FROM institute", (err, result) => {
    if (err) {
      return res.status(500).send("Error getting institutes");
    }
    res.json(result.rows);
  });
});

/* ----- GET franchises ---------- */
app.get("/franchises", (req, res) => {
  database.query("SELECT * FROM franchise", (err, result) => {
    if (err) {
      return res.status(500).send("Error getting franchises");
    }
    res.json(result.rows);
  });
});

/* ------ GET classes ---------- */
app.get("/classes", (req, res) => {
  database.query("SELECT * FROM classes", (err, result) => {
    if (err) {
      return res.status(500).send("Error getting classes");
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

/* ---------- POST franchise ---------- */
app.post("/franchise", (req, res) => {
  const franchises = req.body;

  franchises.forEach(franchise => {
    database.query(
      "INSERT INTO franchise (franchise_name) VALUES ($1)",
      [franchise.franchise_name],
      err => {
        if (err) console.error(err.message);
      }
    );
  });

  res.status(201).send("Franchises saved successfully");
});

/* ---------- POST institute ---------- */
app.post("/institute", (req, res) => {
  const institutes = req.body;

  institutes.forEach(institute => {
    database.query(
      "INSERT INTO institute (institute_name, franchise_id) VALUES ($1,$2)",
      [institute.institute_name, institute.franchise_id],
      err => {
        if (err) console.error(err.message);
      }
    );
  });

  res.status(201).send("Institutes saved successfully");
});

/* ---------- POST class ---------- */
app.post("/class", (req, res) => {
  const classes = req.body;

  classes.forEach(classe => {
    database.query(
      "INSERT INTO classes (class_name) VALUES ($1)",
      [classe.class_name],
      err => {
        if (err) console.error(err.message);
      }
    );
  });

  res.status(201).send("Classes saved successfully");
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

/* ---------- GET students with JOIN ---------- */
app.get("/students/join", (req, res) => {
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
      return res.status(500).send("Error fetching joined data");
    }
    res.json(result.rows);
  });
});

//  Default
app.get("/",(req,res) => {
    res.send("Server is running")
});
 
/* ---------- START SERVER ---------- */
app.listen(3002, () => {
  console.log(`Server running on port 3002`);
});
