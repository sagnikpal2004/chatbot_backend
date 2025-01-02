import jwt from 'jsonwebtoken';
import pool from "../utils/postgres.js";

// import dotenv from "dotenv";
// dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET)
    throw new Error('JWT_SECRET is not defined');

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader)
        return res.sendStatus(401);

    const token = authHeader.split(' ')[1];
    try {
        const decoded_id = jwt.verify(token, JWT_SECRET).id;

        const results = await pool.query("SELECT * FROM users WHERE user_id = $1", [decoded_id]);
        if (results.rowCount === 0)
            return res.sendStatus(401);

        req.user_id = results.rows[0].user_id;
    } catch (error) {
        return res.status(403).send((error).message);
    }

    next();
};

export default authenticateToken;