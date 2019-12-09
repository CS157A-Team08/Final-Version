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

let topten = `CREATE TABLE IF NOT EXISTS topten(
  itemID INT PRIMARY KEY ,
  ranking INT
)`;

let orderdetails = `CREATE TABLE IF NOT EXISTS orderdetails(
  detailsID INT PRIMARY KEY AUTO_INCREMENT,
  itemID INT NOT NULL ,
  orderID INT NOT NULL ,
  time TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
  quantity INT
)`;

let order = `CREATE TABLE IF NOT EXISTS orders(
  orderID INT PRIMARY KEY AUTO_INCREMENT,
  customerID INT NOT NULL,
  orederstatus VARCHAR(60),
  time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

let temporder = `CREATE TABLE IF NOT EXISTS tempOrder(
  
  itemID INT NOT NULL PRIMARY KEY,
  quantity INT
)`;

connection.query(temporder, function (err, results, fields) {
  if (err) {
    console.log(err.message);
  }
});

connection.query(order, function (err, results, fields) {
  if (err) {
    console.log(err.message);
  }
});

connection.query(menu, function (err, results, fields) {
  if (err) {
    console.log(err.message);
  }
});


connection.query(topten, function (err, results, fields) {
  if (err) {
    console.log(err.message);
  }
});

connection.query(employee, function (err, results, fields) {
  if (err) {
    console.log(err.message);
  }
});
connection.query(customer, function (err, results, fields) {
  if (err) {
    console.log(err.message);
  }
});

connection.query(orderdetails, function (err, results, fields) {
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
app.get("/menu/:id", (req, res) => {
  connection.query("SELECT * FROM menu WHERE id = " + req.params.id, (err, result) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({ data: result });
      console.log(result);
    }
  });
});
app.get("/delmenu/:id", (req, res) => {
  connection.query("DELETE FROM menu WHERE id = " + req.params.id, (err, result) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({ data: result });
      console.log(result);
    }
  });
});
app.get("/customerorder", (req, res) => {
  connection.query(
    "SELECT * FROM customer ORDER BY customerID DESC LIMIT 1",
    (err, result) => {
      if (err) {
        return res.send(err);
      } else {
        return res.json({ data: result });
      }
    }
  );
});

app.get("/addorder", (req, res) => {
  const { customer } = req.query;
  var order;
var list=[
  { itemID: 1, quantity: 1 }
];
  connection.query(
    `INSERT INTO orders (customerID,orederstatus) VALUES('${customer}','undone') `,
    (err, result) => {
      if (err) {
        return res.send(err);
      }

      return res.json({ data: result });

    }
  );
  connection.query(
    `SELECT * FROM orders WHERE customerID=${customer} ORDER BY orderID DESC LIMIT 1`, (err, result) => {
      if (err) {
        return res.send(err);
      } else {
        order=result[0].orderID;
        console.log(order);}
    }
  );
  connection.query(
    `SELECT * FROM tempOrder`, (err, result) => {
      if (err) {
        return res.send(err);
      } else {
        list=JSON.parse(JSON.stringify(result));
        for (var i = 0; i < list.length; i++) {
          var item=list[i].itemID;
          var q=list[i].quantity;
          
        connection.query(
          `INSERT INTO orderdetails (orderID,itemID,quantity) VALUES('${order}','${item}','${q}') `, (err, result) => {
            if (err) {
              return res.send(err);
            } 
          });
        }

      }
      
    }
    
  );
 
  connection.query(
    `DELETE FROM tempOrder `,
    (err, result) => {
      if (err) {
        return res.send(err);
      }
    }
  );
    
  
});




app.get("/tempadd", (req, res) => {
  const { id } = req.query;
  connection.query(
    `INSERT INTO tempOrder (itemID,quantity) VALUES('${id}',1) ON DUPLICATE KEY UPDATE quantity = quantity + 1`,
    (err, result) => {
      if (err) {
        return res.send(err);
      }
      console.log('add');
    }
  );
});
app.get("/tempin", (req, res) => {
  const { id } = req.query;
  connection.query(
    `UPDATE tempOrder SET quantity=quantity+1 WHERE itemID='${id}'`,
    (err, result) => {
      if (err) {
        return res.send(err);
      }
      console.log('in');
    }
  );
});
app.get("/tempde", (req, res) => {
  const { id } = req.query;
  console.log('id' + id);
  connection.query(
    `UPDATE tempOrder SET quantity=quantity-1 WHERE itemID='${id}'`,
    (err, result) => {
      if (err) {
        return res.send(err);
      }
      console.log('de');
    }
  );
}); app.get("/tempdelete", (req, res) => {
  const { id } = req.query;
  connection.query(
    `DELETE FROM tempOrder WHERE itemID=${id}`,
    (err, result) => {
      if (err) {
        return res.send(err);
      }
      console.log('del');
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
app.get("/employee", (req, res) => {
  connection.query("SELECT * FROM employee", (err, result) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({ data: result });
    }
  });
});

app.get("/employee/:id", (req, res) => {
  connection.query("SELECT * FROM employee WHERE empID = " + req.params.id, (err, result) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({ data: result });
    }
  });
});
app.get("/addStaff", (req, res) => {
  const { name, phone, position, password } = req.query;
  connection.query(
    `INSERT INTO employee (name,phone,position,password) VALUES ('${name}','${phone}','${position}','${password}' )`,

    (error, results) => {
      if (error) {
        return res.send(err);
      }
    }
  );
});



app.get("/signup", (req, res) => {
  const { name, phone } = req.query;
  console.log(req.query);
  connection.query(
    `INSERT INTO customer (name,phone) VALUES ('${name}','${phone}' )`, (error, results) => {
      if (error) {
        return res.send(err);
      }
    }
  );
  connection.query(
    `SELECT * FROM customer WHERE phone=${phone}`, (err, result) => {
      if (err) {
        return res.send(err);
      } else {
        console.log({ data: result });
        return res.json({ data: result });
      }
    }
  );
});



app.get("/managemenu", (req, res) => {
  const { id, name, price, imageURL, category } = req.query;
  connection.query(
    `INSERT INTO menu (name,price,imageURL,category) VALUES ('${name}','${price}','${imageURL}','${category}' )`,

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
