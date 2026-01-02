const studentController = require("../controllers/studentController");

function studentRoutes(req, res) {

  if (req.method === "GET" && req.url === "/students") {
    studentController.getStudents(req, res);
    return true;
  }

  if (req.method === "POST" && req.url === "/student") {
    studentController.createStudent(req, res);
    return true;
  }

  if (req.method === "DELETE" && req.url.startsWith("/student/")) {
    studentController.deleteStudent(req, res);
    return true;
  }

  return false;
}

module.exports = studentRoutes;
