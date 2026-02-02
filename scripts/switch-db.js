const fs = require('fs');
const path = require('path');

const mode = process.argv[2]; // 'sqlite' or 'postgres'

if (!['sqlite', 'postgres'].includes(mode)) {
    console.error('Usage: node scripts/switch-db.js <sqlite|postgres>');
    process.exit(1);
}

const prismaPath = path.join(__dirname, '../prisma/schema.prisma');
const envPath = path.join(__dirname, '../.env');

// Update schema.prisma
let schemaContent = fs.readFileSync(prismaPath, 'utf8');
if (mode === 'sqlite') {
    schemaContent = schemaContent.replace(/provider\s*=\s*"postgresql"/, 'provider = "sqlite"');
} else {
    schemaContent = schemaContent.replace(/provider\s*=\s*"sqlite"/, 'provider = "postgresql"');
}
fs.writeFileSync(prismaPath, schemaContent);
console.log(`Updated schema.prisma provider to ${mode}`);

// Update .env
let envContent = fs.readFileSync(envPath, 'utf8');
const lines = envContent.split('\n');
const newLines = lines.map(line => {
    if (line.trim().startsWith('DATABASE_URL=')) {
        return `# ${line}`;
    }
    if (line.trim().startsWith('# DATABASE_URL=')) {
        // Check which one it is
        const uncommented = line.replace('# ', '');
        // If mode is sqlite and line contains dev.db, uncomment
        if (mode === 'sqlite' && uncommented.includes('file:./dev.db')) {
            return uncommented;
        }
        // If mode is postgres and line contains postgresql:, uncomment
        if (mode === 'postgres' && uncommented.includes('postgresql:')) {
            return uncommented;
        }
    }
    return line;
});

// Final cleanup to ensure only one is active and the correct one is active
// This simple logic above might double comment or fail if format is unexpected.
// Let's do a more robust approach:
// 1. Read all vars.
// 2. Identify the SQLite and Postgres lines.
// 3. Reconstruct.

// Actually, regex replacement is safer for specific known blocks.
// But since the setup is simple:
// SQLite line: DATABASE_URL="file:./dev.db"
// Postgres line: DATABASE_URL="postgresql://..."

let updatedEnv = envContent;

if (mode === 'sqlite') {
    // Comment out postgres
    updatedEnv = updatedEnv.replace(/^DATABASE_URL="postgresql:/gm, '# DATABASE_URL="postgresql:');
    // Uncomment sqlite
    updatedEnv = updatedEnv.replace(/^#\s*DATABASE_URL="file:/gm, 'DATABASE_URL="file:');
} else {
    // Comment out sqlite
    updatedEnv = updatedEnv.replace(/^DATABASE_URL="file:/gm, '# DATABASE_URL="file:');
    // Uncomment postgres
    updatedEnv = updatedEnv.replace(/^#\s*DATABASE_URL="postgresql:/gm, 'DATABASE_URL="postgresql:');
}

fs.writeFileSync(envPath, updatedEnv);
console.log(`Updated .env DATABASE_URL for ${mode}`);

console.log('Run `npx prisma generate` to update the client.');
