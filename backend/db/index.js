require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
    host: process.env.DATABASEHOST,
    user: process.env.DATABASEUSER,
    port: Number(process.env.DATABASEPORT),
    password: process.env.DATABASEPASSWORD,
    database: process.env.DATABASE
});

client.connect();

// Export a query function for reuse
module.exports = {
    query: (text, params) => client.query(text, params)
};