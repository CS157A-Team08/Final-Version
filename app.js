const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "cs157a"
});
connection.connect(err => {
  if (err) {
    return err;
  }
});
app.use(cors());

let customer = `CREATE TABLE IF NOT EXISTS customer(
  customerID INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  phone BIGINT NOT NULL DEFAULT 0
)`;
let menu = `CREATE TABLE IF NOT EXISTS menu(
  itemID INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  price double not null default 0,
  imageUrl varchar(255),
  inCart INT NOT NULL
)`;
let employee = `CREATE TABLE IF NOT EXISTS employee(
  empID INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  phone BIGINT NOT NULL DEFAULT 0,
  position VARCHAR(255) ,
  password VARCHAR(60) NOT NULL
)`;
let shiftrecord = `CREATE TABLE IF NOT EXISTS shiftrecord(
  shiftID INT PRIMARY KEY AUTO_INCREMENT,
  empID INT NOT NULL,
  starttime TIMESTAMP,
  endtime TIMESTAMP
)`;
let topten = `CREATE TABLE IF NOT EXISTS topten(
  itemID INT PRIMARY KEY ,
  ranking INT
)`;

let orderdetails = `CREATE TABLE IF NOT EXISTS orderdetails(
  detailsID INT PRIMARY KEY AUTO_INCREMENT,
  time TIMESTAMP NOT NULL,
  customerID INT NOT NULL,
  orederstatus INT
)`;

let order = `CREATE TABLE IF NOT EXISTS orders(
  orderID INT PRIMARY KEY AUTO_INCREMENT,
  customerID INT NOT NULL,
  orederstatus INT,
  time TIMESTAMP NOT NULL
)`;

connection.query(order, function(err, results, fields) {
  if (err) {
    console.log(err.message);
  }
  });

connection.query(menu, function(err, results, fields) {
  if (err) {
    console.log(err.message);
  }
  });


    connection.query(topten, function(err, results, fields) {
      if (err) {
        console.log(err.message);
      }
      });
      connection.query(shiftrecord, function(err, results, fields) {
        if (err) {
          console.log(err.message);
        }
        });

connection.query(employee, function(err, results, fields) {
    if (err) {
      console.log(err.message);
    }
    });
connection.query(customer, function(err, results, fields) {
if (err) {
  console.log(err.message);
}
});

connection.query(orderdetails, function(err, results, fields) {
if (err) {
  console.log(err.message);
}
});

app.get("/", (req, res) => {
  res.send("connected");
});

// changed to
app.get("/menu", (req, res) => {
  connection.query("SELECT * FROM menu", (err, result) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({ data: result });
    }
  });
});

app.get("/customerorder", (req, res) => {
  connection.query(
    "SELECT * FROM customer ORDER BY id DESC LIMIT 1",
    (err, result) => {
      if (err) {
        return res.send(err);
      } else {
        return res.json({ data: result });
      }
    }
  );
});

app.get("/staffaccounts", (req, res) => {
  connection.query("SELECT * FROM staffaccounts", (err, result) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({ data: result });
    }
  });
});

app.get("/login", (req, res) => {
  const { name, phone } = req.query;
  connection.query(
    `INSERT INTO customer (name,phone) VALUES ('${name}','${phone}' )`,

    (error, results) => {
      if (error) {
        return res.send(err);
      }
    }
  );
});

app.get("/managemenu", (req, res) => {
  const { id, name, price, imageURL, category } = req.query;
  connection.query(
    `INSERT INTO menu (id,name,price,imageURL,category) VALUES ('${id}','${name}','${price}','${imageURL}','${category}' )`,

    (error, results) => {
      if (error) {
        return res.send(err);
      }
    }
  );
});

app.get("/drinks", (req, res) => {
  connection.query("SELECT * FROM drinks", (err, result) => {
    if (err) throw err;
    else {
      return res.json({ data: result });
    }
    res.end(JSON.stringify(results));
  });
});

app.listen(4000, () => {
  console.log("4000");
});
