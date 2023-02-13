const express = require('express');
const db = require('./database');
const bodyParser = require('body-parser');

const app = express();
const PORT = 4000;

// Add body parser as middleware (processes requests 
    // from user before endpoint)
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

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

app.post('/api/todos', (req, res) => {
    // Input Validation
    var errors = [];
    if(!req.body.name) {
        errors.push("No Name supplied");
    }
    // If there are any validation errors
    if(errors.length) {
        res.status(400).json({ 'error': errors.join(',')});
        return;
    }

    var data = {
        name: req.body.name
    }

    var sql = 'INSERT INTO todos (name) VALUES (?);';
    var params = [data.name];

    db.run(sql, params, function(err, result) {
        if(err) {
            res.status(400).json({'error': err.message});
        }

        res.status(201).json({
            id: this.lastID,
            name: data.name
        })
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port: http://localhost:${PORT}`);
});