require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    database: process.env.PGDATABASE,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
    host: process.env.PGHOST,
    keepAlive: true
})

pool.connect().then(res => console.log("Connection Successfull"))
    .catch(err => console.log("DB Faild>>>", err));

// pool.query('SELECT id, uname, password, email FROM public.user').then(res => console.log(res.rows))
//     .then(err => console.log(err));

module.exports = pool;