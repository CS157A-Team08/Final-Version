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
  imageUrl VARCHAR(255),
  inCart INT NOT NULL,
  category VARCHAR(60)
)`;
let employee = `CREATE TABLE IF NOT EXISTS employee(
  empID INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  phone BIGINT NOT NULL DEFAULT 0,
  position VARCHAR(255) ,
  password VARCHAR(60) NOT NULL
)`;


let orderdetails = `CREATE TABLE IF NOT EXISTS orderdetails(
  detailsID INT PRIMARY KEY AUTO_INCREMENT,
  itemID INT NOT NULL ,
  time TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
  quantity INT
)`;

let order = `CREATE TABLE IF NOT EXISTS orders(
  orderID INT PRIMARY KEY AUTO_INCREMENT,

  orederstatus VARCHAR(60),
  time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

let temporder = `CREATE TABLE IF NOT EXISTS tempOrder(
  
  itemID INT NOT NULL PRIMARY KEY,
  quantity INT
)`;

let orderiter = `CREATE TABLE IF NOT EXISTS orderiter(
  orderID INT NOT NULL ,
  detailsID INT NOT NULL,
  PRIMARY KEY(orderID,detailsID)
  
)`;

let orderby = `CREATE TABLE IF NOT EXISTS orderby(
  orderID INT NOT NULL ,
  customerID INT NOT NULL ,
  PRIMARY KEY(orderID,customerID)
  
)`;
let setorderstatus = `CREATE TABLE IF NOT EXISTS setorderstatus(
  orderID INT NOT NULL PRIMARY KEY,
  staffID INT NOT NULL ,
  time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;
let payment =`CREATE TABLE IF NOT EXISTS payment(
  paymentID INT PRIMARY KEY AUTO_INCREMENT,
  customerID INT NOT NULL,
  orderID INT NOT NULL,
  amount double not null ,
  paidamount double not null ,
  type VARCHAR(60),
  cardNO BIGINT,
  time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;


connection.query(orderby, function (err, results, fields) {
  if (err) {
    console.log(err.message+'by');
  }
});
connection.query(orderiter, function (err, results, fields) {
  if (err) {
    console.log(err.message+'it');
  }
});
connection.query(payment, function (err, results, fields) {
  if (err) {
    console.log(err.message+'p');
  }
});
connection.query(setorderstatus, function (err, results, fields) {
  if (err) {
    console.log(err.message+'se');
  }
});
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

app.get("/menucat", (req, res) => {
  const { category}=req.query;
console.log(category);
  connection.query(`SELECT * FROM menu WHERE category = '${ category}'` ,(err, result) => {
    if (err) {
      return res.send(err);
    } else {
      console.log(result);
      return res.json({ data: result });
     
    }
  });
});
app.get("/managemenu", (req, res) => {
  var { id, name, price, imageURL, category } = req.query;
  price = price.trim();
  console.log(req.query);
  console.log(price+name);
  connection.query(
    `INSERT INTO menu (name,price,imageURL,category) VALUES ('${name}','${price}','${imageURL}','${category}' )`,

    (error, results) => {
      if (error) {
        return res.send(err);
      }
    }
  );
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
app.get("/deletemenu/:id", (req, res) => {
  connection.query("DELETE FROM menu WHERE id = " + req.params.id, (err, result) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({ data: result });
      console.log(result);
    }
  });
});

app.get("/editmenu", (req, res) => {
  const { itemID, name, price, imageURL, category } = req.query;
  connection.query(
    `UPDATE menu SET name='${name}', price=${price}, imageURL='${imageURL}', category='${category}' WHERE id=${itemID}`,

    (error, results) => {
      if (error) {
        return res.send(error);
      } else {
        return res.json({ data: "SUCCESS" });
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


  connection.query(
    `INSERT INTO orders (orederstatus) VALUES('undone') `,
    (err, result) => {
      if (err) {
        return res.send(err);
      }

      return res.json({ data: result });

    }
  );
  connection.query(
    `SELECT * FROM orders ORDER BY orderID DESC LIMIT 1`, (err, result) => {
      if (err) {
        return res.send(err);
      } else {
        order=result[0].orderID;
        console.log(order);
        connection.query(
          `INSERT INTO orderby (orderID,customerID) VALUES('${order}','${customer}') `, (err, result) => {
            if (err) {
              return res.send(err);
            } 
          });
      }
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
          console.log(item+','+q)
        connection.query(
          `INSERT INTO orderdetails (itemID,quantity) VALUES('${item}','${q}') `, (err, result) => {
            if (err) {
              return res.send(err);
            } 
          });
          connection.query(
            `SELECT * FROM orderdetails ORDER BY detailsID DESC LIMIT 1 `, (err, result) => {
              if (err) {
                return res.send(err);
              } 
              d=result[0].detailsID;
        console.log(d);
        connection.query(
          `INSERT INTO orderiter (orderID,detailsID) VALUES('${order}','${d}') `, (err, result) => {
            if (err) {
              return res.send(err);
            } 
          });
            });
         

        }
        connection.query(
          `DELETE FROM tempOrder `,
          (err, result) => {
            if (err) {
              return res.send(err);
            }
          }
        );
      }
      
    }
    
  );
 
  
    
  
});

app.get("/getorderby", (req, res) => {
  connection.query("SELECT * FROM orderby ORDER BY orderID DESC LIMIT 1", (err, result) => {
    if (err) {
      return res.send(err);
    } else {
      console.log(result);
      return res.json({ data: result });
    }
  });
});
app.get("/payment", (req, res) => {
  const { orderID,customerID, type, amount, paidamount, cardNo } = req.query;
  console.log(req.query);
  connection.query(
    `INSERT INTO payment (orderID,customerID, type, amount, paidamount, cardNo ) VALUES ('${orderID}','${customerID}','${type}','${amount}', '${paidamount}','${cardNo}')`,

    (error, results) => {
      if (error) {
        return res.send(err);
      }
      else {
        console.log("success");
       
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
      else {console.log('add');
        return res.json({ data: "SUCCESS" });

      
    }
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
      else {
        console.log('in');
        return res.json({ data: "SUCCESS" });
      }
   
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
      else {
        console.log('de');
        return res.json({ data: "SUCCESS" });}
      
      
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
      else {
        console.log('del');
        return res.json({ data: "SUCCESS" });}
      
      
    }
  );
  
});

app.get("/orderlist", (req, res) => {
  connection.query(`SELECT orders.orderID, menu.name as item, orderdetails.quantity,customer.name
  FROM orders,orderby,customer,orderdetails,orderiter,menu
  WHERE orders.orderID=orderby.orderID AND orderby.customerID=customer.customerID AND orders.orderID=orderiter.orderID AND orderdetails.detailsID=orderiter.detailsID AND orderdetails.itemID=menu.id`
  , (err, result) => {
    if (err) {
      return res.send(err);
    } else {
      console.log(JSON.parse(JSON.stringify(result)));
      return res.json({  result });
    }
  });
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
      } else {
        return res.json({ data: "SUCCESS" });
      }

    }
  );
});app.get("/employee", (req, res) => {
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
        return res.send(error);
      } else {
        return res.json({ data: "SUCCESS" });
      }
    });
});

app.get("/deleteStaff/:id", (req, res) => {
  connection.query(
    "DELETE FROM employee WHERE empID = " + req.params.id,
    (error, results) => {
      if (error) {
        console.log("Delete not successful")
        return res.send(err);
      } else {
        return res.json({ data: "SUCCESS" });
      }
    });
});

//UPDATE employee SET name = "Robo Tom 2.0", phone = 1234567890, position = "Line Cook", password = "ch33$e" WHERE empID = 4
app.get("/editStaff", (req, res) => {
  const { empID, name, phone, position, password } = req.query;
  connection.query(
    `UPDATE employee SET name='${name}', phone=${phone}, position='${position}', password='${password}' WHERE empID=${empID}`,

    (error, results) => {
      if (error) {
        return res.send(error);
      } else {
        return res.json({ data: "SUCCESS" });
      }
    });
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
