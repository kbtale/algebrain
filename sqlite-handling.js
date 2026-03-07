// SQLite handling module for Algebrain
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'algebrain.db');

/**
 * Creates and returns an SQLite database connection
 */
function CrCnn() {
    const db = new sqlite3.Database(dbPath, (err) => {
        if (err) {
            console.error('Error connecting to the database:', err.message);
        } else {
            console.log('Connected to the SQLite database.');
        }
    });
    return db;
}

/**
 * Executes a raw SQL query and returns results via common callback pattern
 */
function MkQr(db, qs, callback) {
    db.all(qs, [], (err, rows) => {
        if (err) {
            return callback(err);
        }
        // Emulating the MySQL response format: [rows, fields]
        callback(null, [rows, []]);
    });
}

/**
 * Executes a SELECT query with optional where clause
 */
function MkSlQr(db, f, t, c, callback) {
    let qs = `SELECT ${f} FROM ${t}`;
    if (c) {
        qs += ` WHERE ${c}`;
    }
    MkQr(db, qs, callback);
}

exports.CrCnn = CrCnn;
exports.MkQr = MkQr;
exports.MkSlQr = MkSlQr;
