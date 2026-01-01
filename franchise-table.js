
const express = require("express");
const database = require("./database");

const app = express();
const PORT = 3800;

// middleware to read JSON
app.use(express.json());

/* ----- GET franchises ---------- */
app.get("/franchises", (req, res) => {
    database.query("SELECT * FROM franchise", (err, result) => {
      if (err) {
        return res.status(500).send("Error getting franchises");
      }
      res.json(result.rows);
    });
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
  
  /* ---------- DELETE student ---------- */
app.delete("/franchise/:id", (req, res) => {
    const id = req.params.id;
  
    database.query(
      "DELETE FROM franchise WHERE franchise_id = $1",
      [id],
      err => {
        if (err) {
          return res.status(500).send("Error deleting franchise");
        }
        res.send("Frinchise deleted successfully");
      }
    );
  });
  