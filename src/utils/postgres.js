import pg from "pg";

import dotenv from "dotenv";
dotenv.config();

const pool = new pg.Pool ({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});

pool.on("connect", (client) => {
    client.query(`SET search_path TO ${process.env.PG_SCHEMA}, public`);
});

export default pool;