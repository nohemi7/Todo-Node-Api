const express = require('express');
const db = require('./database');

const app = express();
const PORT = 4000;

// Endpoints

app.get('/api/todos', (req, res) => {
    var sql = 'SELECT * FROM todos;';
    var params = [];

    db.all(sql, params, (err, rows) => {
        if(err) {
            res.status(400).json({ "error": err.message});
        }
        res.status(200).json(rows);

    });
});

app.listen(PORT, () => {
    console.log(`Server running on port: http://localhost:${PORT}`);
});