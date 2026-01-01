
const express = require("express");
const database = require("./database");

const app = express();
const PORT = 3800;

// middleware to read JSON
app.use(express.json());

/* ----- GET institutes ---------- */
app.get("/institutes", (req, res) => {
    database.query("SELECT * FROM institute", (err, result) => {
      if (err) {
        return res.status(500).send("Error getting institutes");
      }
      res.json(result.rows);
    });
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
  

  /* ---------- DELETE student ---------- */
app.delete("/institute/:id", (req, res) => {
    const id = req.params.id;
  
    database.query(
      "DELETE FROM institute WHERE institute_id = $1",
      [id],
      err => {
        if (err) {
          return res.status(500).send("Error deleting institute");
        }
        res.send("institute deleted successfully");
      }
    );
  });