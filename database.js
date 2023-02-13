const sqlite3 = require('sqlite3').verbose();
// create a database
let db = new sqlite3.Database('todo.db', (err) => {
    // If there is an error connecting to db
    if(err) {
        console.error(err.message);
        throw err;
    }
    else {
         console.log('Connect to db ...');
         db.run(`CREATE TABLE todos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT)`,
            (err) => {
                if(err) {
                    console.log('Table already created');
                }
            });
    }
});

module.exports = db;