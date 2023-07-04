const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',  // Replace with your MySQL server host
  user: 'your_username', // Replace with your MySQL username
  password: 'your_password', // Replace with your MySQL password
  database: 'your_database', // Replace with your MySQL database name
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database!');
  getRecentOrders((err, orders) => {
    if (err) {
      console.error('Error retrieving recent orders:', err);
      return;
    }
    console.log('Recent Orders:', orders);
    connection.end((err) => {
      if (err) {
        console.error('Error closing the database connection:', err);
        return;
      }
      console.log('Database connection closed!');
    });
  });
});

function getRecentOrders(callback) {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const query = `SELECT * FROM orders WHERE createdAt >= ?`;

  connection.query(query, [oneWeekAgo], (err, results) => {
    if (err) {
      console.error('Error executing the query:', err);
      callback(err, null);
      return;
    }
    callback(null, results);
  });
}
