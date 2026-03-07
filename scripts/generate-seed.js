const fs = require('fs');
const path = require('path');

const dataPath = path.resolve(__dirname, '..', 'DATA.md');
const seedPath = path.resolve(__dirname, '..', 'sql', 'seed.sql');

const content = fs.readFileSync(dataPath, 'utf8');
const lines = content.split('\n').filter(line => line.trim().startsWith('- **'));

let sql = '-- Default seeding for Algebrain Branches\n';
sql += 'DELETE FROM Branches;\n\n';

lines.forEach(line => {
    const match = line.match(/- \*\*(.*?)\*\*: (.*)/);
    if (match) {
        const name = match[1].trim();
        const desc = match[2].trim();
        const escapedDesc = desc.replace(/'/g, "''");
        sql += `INSERT INTO Branches (BrName, BrDescription) VALUES ('${name}', '${escapedDesc}');\n`;
    }
});

fs.writeFileSync(seedPath, sql);
