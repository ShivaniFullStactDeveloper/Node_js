/**
 * AUTH ROUTES FILE
 * ----------------
 * This file handles all authentication related APIs
 * Example:
 *  - Register (Signup)
 *  - Login (next step)
 */

const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); // 🔥 REQUIRED
const pool = require("../db"); // PostgreSQL connection

const router = express.Router();

/**
 * =====================================================
 * REGISTER API (SIGNUP)
 * =====================================================
 * Method : POST
 * URL    : /auth/register
 *
 * Purpose:
 *  - Create a new user
 *  - Hash password before saving
 *  - Prevent duplicate email registration
 */
router.post("/register", async (req, res) => {
  try {
    /* ---------------------------------------------
       1️⃣ READ DATA FROM REQUEST BODY
       --------------------------------------------- */
    const { name, email, password } = req.body;

    console.log("REQ BODY 👉", req.body); // Debug purpose

    /* ---------------------------------------------
       2️⃣ BASIC VALIDATION
       --------------------------------------------- */
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }

    /* ---------------------------------------------
       3️⃣ CHECK IF USER ALREADY EXISTS
       ---------------------------------------------
       We do not allow duplicate email registration
    */
    const userExists = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );

    if (userExists.rows.length > 0) {
      return res.status(409).json({
        message: "User already exists with this email",
      });
    }

    /* ---------------------------------------------
       4️⃣ HASH PASSWORD
       ---------------------------------------------
       NEVER store plain text password in DB
       bcrypt.hash(password, saltRounds)
    */
    const hashedPassword = await bcrypt.hash(password, 10);

    /* ---------------------------------------------
       5️⃣ INSERT USER INTO DATABASE
       --------------------------------------------- */
    const newUser = await pool.query(
      `
      INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3)
      RETURNING id, name, email, role
      `,
      [name, email, hashedPassword]
    );

    /* ---------------------------------------------
       6️⃣ SEND SUCCESS RESPONSE
       --------------------------------------------- */
    return res.status(201).json({
      message: "User registered successfully ✅",
      user: newUser.rows[0],
    });

  } catch (error) {
    /* ---------------------------------------------
       7️⃣ ERROR HANDLING
       --------------------------------------------- */
    console.error("REGISTER ERROR 👉", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

/* =====================================================
   LOGIN API
   =====================================================
   Method : POST
   URL    : /auth/login

   Purpose:
   - Verify email & password
   - Generate JWT token
*/
router.post("/login", async (req, res) => {
  try {
    /* ---------------------------------------------
       1️⃣ READ EMAIL & PASSWORD
       --------------------------------------------- */
    const { email, password } = req.body;

    /* ---------------------------------------------
       2️⃣ VALIDATION
       --------------------------------------------- */
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    /* ---------------------------------------------
       3️⃣ FIND USER BY EMAIL
       --------------------------------------------- */
    const userResult = await pool.query(
      `
      SELECT id, name, email, password, role
      FROM users
      WHERE email = $1
      `,
      [email]
    );

    // If user not found
    if (userResult.rows.length === 0) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const user = userResult.rows[0];

    /* ---------------------------------------------
       4️⃣ COMPARE PASSWORD
       ---------------------------------------------
       bcrypt.compare(plain, hashed)
    */
    const isPasswordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    /* ---------------------------------------------
       5️⃣ GENERATE JWT TOKEN
       --------------------------------------------- */
    const token = jwt.sign(
      {
        userId: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h", // token validity
      }
    );

    /* ---------------------------------------------
       6️⃣ SEND RESPONSE
       --------------------------------------------- */
    return res.status(200).json({
      message: "Login successful ✅",
      token: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error("LOGIN ERROR 👉", error);
    return res.status(500).json({
      message: "Server error",
    });
  }
});


module.exports = router;
