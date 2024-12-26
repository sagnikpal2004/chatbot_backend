import jwt from 'jsonwebtoken';

import Profile from "../models/Profile.js";
import User from "../models/User.js";

import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) 
    throw new Error('JWT_SECRET is not defined');

const generateToken = (id) => {
    return jwt.sign({ id }, JWT_SECRET, { expiresIn: '30d' });
};

export const getUserProfile = async (req, res) => {
    res.status(200).json(req.user);
};

export const registerUser = async (req, res) => {
    const { username, password }  = req.body;
    
    const userExists = await User.findOne({ username });
    if (userExists)
        return res.sendStatus(409);

    const user = await User.create({ username, password });
    if (!user)
        return res.sendStatus(500);
    await Profile.create({ user: user._id });

    const token = generateToken(user._id.toString());
    res.status(201).json({ token });
};

export const loginUser = async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user)
        return res.sendStatus(401);
    if (!user.checkPass(password))
        return res.sendStatus(401);

    const token = generateToken(user._id.toString());
    res.status(200).json({ token })
};

// TODO: Delete from users, profile and chats collections
export const deleteUser = async (req, res) => {

};