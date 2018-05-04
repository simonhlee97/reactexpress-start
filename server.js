const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyparser = require('body-parser');

const app = express();
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());

const LIST_ALL_QUERY = 'SELECT * FROM posts'
// First you need to create a connection to the db
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'sendgrid'
});

con.connect((err) => {
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});

app.use(cors());

app.get('/', (req, res) => {
	res.send('Home Page. No DB Query')
})

app.get('/posts', (req, res) => {
	con.query(LIST_ALL_QUERY, (err, results) => {
		if(err) {
			return res.send(err)
		} else {
			return res.json({
				data: results
			})
		}
	})
})

app.get('/add', (req, res) => {
	const {title, post} = req.query;
	const INSERTQUERY = `INSERT INTO posts (title, post) VALUES ('${title}', '${post}')`;
	con.query(INSERTQUERY, (err, results) => {
		if(err) {
			return res.send(err)
		} else {
			return res.send('successfully added post')
		}
	});
})

app.get('/customers', (req, res) => {
  const customers = [
    {id: 1, firstName: 'John', lastName: 'Doe'},
    {id: 2, firstName: 'Brad', lastName: 'Traversy'},
    {id: 3, firstName: 'Mary', lastName: 'Swanson'},
  ];

  res.json(customers);
});

// app.get('/posts', (req, res) => {
// 	con.connect(function(err) {
// 		if (err) throw err;
// 		//Select all customers and return the result object:
// 		con.query("SELECT * FROM posts", function (err, result, fields) {
// 		  if (err) throw err;
// 		  console.log(result);
// 		  res.json(result);
// 		});
// 	  });
//   })
app.listen(5000, () => {
	console.log('Server listening on port 5000')
});

module.exports = app;


