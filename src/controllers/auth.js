import jwt from 'jsonwebtoken';
import pool from "../utils/postgres.js";
import bcrypt from "bcrypt";

import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) 
    throw new Error('JWT_SECRET is not defined');

const generateToken = (id) => jwt.sign({ id }, JWT_SECRET, { expiresIn: '30d' });

export const getUserProfile = async (req, res) => {
    const user = (await pool.query("SELECT * FROM users WHERE user_id = $1", [req.user_id])).rows[0];
    res.status(200).json({ user });
};

export const registerUser = async (req, res) => {
    const { name, email, phone, password, role }  = req.body;
    
    const results = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (results.rowCount > 0)
        return res.sendStatus(409);

    const hased_password = await bcrypt.hash(password, await bcrypt.genSalt(10));
    const user_id = (await pool.query(
        "INSERT INTO users (name, email, phone, password, role) VALUES ($1, $2, $3, $4, $5) RETURNING user_id", 
        [name, email, phone, hased_password, role]
    )).rows[0].user_id;

    const token = generateToken(user_id);
    res.status(201).json({ token });
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (result.rowCount === 0)
        return res.sendStatus(404);
    const user = result.rows[0];

    if (!(await bcrypt.compare(password, user.password)))
        return res.sendStatus(401);

    const token = generateToken(user.user_id);
    res.status(200).json({ token })
};

// TODO: Delete from users, profile and chats collections
export const deleteUser = async (req, res) => {

};