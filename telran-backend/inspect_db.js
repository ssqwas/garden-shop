const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite');

db.serialize(() => {
    db.all("SELECT * FROM Products LIMIT 5", (err, rows) => {
        if (err) {
            console.error(err);
        } else {
            console.log("Products:", JSON.stringify(rows, null, 2));
        }
    });

    db.all("SELECT * FROM Categories LIMIT 5", (err, rows) => {
        if (err) {
            console.error(err);
        } else {
            console.log("Categories:", JSON.stringify(rows, null, 2));
        }
    });
});

db.close();
