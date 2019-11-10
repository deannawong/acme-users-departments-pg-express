const express = require("express");
const path = require("path");
const db = require("./db.js");

const PORT = 3000;

const app = express();
app.use(express.json());

app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "./index.html"));
});

app.get("/api/users", (req, res, next) => {
  db.findAllUsers()
    .then(data => {
      res.send(data);
    })
    .catch(next);
});
app.get("/api/departments", (req, res, next) => {
  db.findAllDepartments()
    .then(data => {
      res.send(data);
    })
    .catch(next);
});
app.get("/api/offices", (req, res, next) => {
  db.findAllOffices().then(data => {
    res.send(data);
  });
});

db.clientFunc().then(() => {
  app.listen(PORT, () => {
    console.log(`Application started on http://localhost:${PORT}`);
  });
});
