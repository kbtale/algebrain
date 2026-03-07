const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const dbPath = path.resolve(__dirname, '..', 'algebrain.db');
const schemaPath = path.resolve(__dirname, '..', 'sql', 'algebrain-sqlite.sql');
const seedPath = path.resolve(__dirname, '..', 'sql', 'seed.sql');

if (fs.existsSync(dbPath)) {
    fs.unlinkSync(dbPath);
}

const db = new sqlite3.Database(dbPath);

const schema = fs.readFileSync(schemaPath, 'utf8');
const seed = fs.readFileSync(seedPath, 'utf8');

db.serialize(() => {
    db.exec(schema, (err) => {
        if (err) {
            console.error('Error applying schema:', err.message);
            process.exit(1);
        }
    });
    db.exec(seed, (err) => {
        if (err) {
            console.error('Error seeding data:', err.message);
            process.exit(1);
        }
        console.log('Database initialized successfully! 🚀');
    });
});

db.close();
