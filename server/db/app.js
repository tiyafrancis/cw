
const mysql = require('mysql');
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'MYGAME!1database',
  database: 'pacman'
});

con.connect((err) => {
  if(err) throw err;
  console.log('Connection established');
});
// checking whether query works 
// vvvvvvvvvvvvvvvvvvvvvvvvvvv
con.query('SELECT * FROM scoreboard', (err,rows) => {
    if(err) throw err;

    console.log('Data received from Db:');
    console.log(rows);
});