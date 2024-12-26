import jwt from 'jsonwebtoken';

import User from "../models/User.js";

import dotenv from "dotenv";
dotenv.config();

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

        const user = await User.findById(decoded_id);
        if (!user)
            res.sendStatus(401);

        req.user = user.toObject();
        delete req.user.password;
    } catch (error) {
        return res.status(403).send((error).message);
    }

    next();
};

export default authenticateToken;