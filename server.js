const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');

const app = express();
const port = 5500;

// Middleware to parse JSON data
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// MySQL connection
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'akshat'
});

app.post('/', (req, res) => {
    const newData = req.body;

    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting MySQL connection: ' + err.stack);
            res.status(500).send('Error connecting to database');
            return;
        }

        connection.query('INSERT INTO form SET ?', newData, function (error, results, fields) {
            connection.release();

            if (error) {
                console.error('Error inserting data: ' + error.stack);
                res.status(500).send('Error inserting data');
                return;
            }
            res.status(200).send({ message: 'Data inserted successfully' });
        });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
