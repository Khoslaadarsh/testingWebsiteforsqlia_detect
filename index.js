const express = require("express");
const app = express();
const checkForSQLIA = require("./SQLIA_test");

app.set("view engine", "hbs");
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Akk@7628",
  database: "test",
  multipleStatements: true,
});

let findUsers = (user) => {
  console.log(user);
  return new Promise((resolve, reject) => {
    try {
      connection.query(
        `SELECT * FROM users where username = "${user.username}" && password = "${user.password}"`,
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        }
      );
    } catch (err) {
      reject(err);
    }
  });
};

let selectAllUsers = () => {
  return new Promise((resolve, reject) => {
    try {
      connection.query(`SELECT * FROM users`, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    } catch (err) {
      reject(err);
    }
  });
};

app.get("/", (req, res) => {
  res.render("login");
});

app.post("/logout", (req, res) => {
  res.redirect("/");
});

app.post("/", (req, res) => {
  if (!checkForSQLIA(req.body.username) && !checkForSQLIA(req.body.password)) {
    findUsers(req.body)
      .then((rows) => {
        if (rows.length) {
          selectAllUsers()
            .then((rows) => {
              res.render("login", { users: rows, flag: true });
            })
            .catch((err) => {
              res.redirect("/");
            });
        } else {
          res.redirect("/");
        }
      })
      .catch((err) => {
        res.redirect("/");
      });
  } else{
    console.log("SQL injected");
    res.redirect('/');
  }
});

app.listen("3000", () => {
  console.log("Server started on port 3000");
});
