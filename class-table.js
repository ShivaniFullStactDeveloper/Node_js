
const express = require("express");
const database = require("./database");

const app = express();
const PORT = 3800;

// middleware to read JSON
app.use(express.json());

/* ------ GET classes ---------- */
app.get("/classes", (req, res) => {
    database.query("SELECT * FROM classes", (err, result) => {
      if (err) {
        return res.status(500).send("Error getting classes");
      }
      res.json(result.rows);
    });
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
app.delete("/class/:id", (req, res) => {
    const id = req.params.id;
  
    database.query(
      "DELETE FROM classes WHERE class_id = $1",
      [id],
      err => {
        if (err) {
          return res.status(500).send("Error deleting class");
        }
        res.send("Class deleted successfully");
      }
    );
  });