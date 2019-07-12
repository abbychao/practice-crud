const { Pool, Client } = require('pg');
const connectionString = `postgres://cudrsexnjphglu:151d2ec9560ad36f9893ee668160d2db91de2277ef772a86aaf52e731112040e@ec2-23-21-115-109.compute-1.amazonaws.com:5432/d4p9d6hbv9n6d8
`;

const pool = new Pool({ connectionString, ssl: true });

module.exports = pool;
