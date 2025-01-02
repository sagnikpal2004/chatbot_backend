import pool from "../utils/postgres.js";

export const getChats = async (req, res) => {
    const chats = (await pool.query("SELECT * FROM chats WHERE user_id = $1", [req.user_id])).rows;
    res.status(200).json(chats);
};

export const getChatByID = async (req, res) => {
    const { id } = req.params

    const results = await pool.query("SELECT * FROM chats WHERE chat_id = $1 AND user_id = $2", [id, req.user_id]);
    if (results.rowCount == 0)
        res.sendStatus(404)

    const chat = results.rows[0];
    res.status(200).json(chat);
};

export const getLatestChat = async (req, res) => {
    const chat = (await pool.query(
        "SELECT * FROM chats WHERE user_id = $1 ORDER BY created_at DESC LIMIT 1", 
        [req.user_id]
    )).rows[0];

    res.status(200).json(chat);
};

export const createChat = async (req, res) => {
    const { prompt, response, rating } = req.body

    const chat_id = (await pool.query(
        "INSERT INTO chats (user_id, prompt, response, rating) VALUES ($1, $2, $3, $4) RETURNING chat_id", 
        [req.user_id, prompt, response, rating]
    )).rows[0].chat_id;
    
    res.status(201).json(chat_id);
};

export const updateChat = async (req, res) => {
    const { id } = req.params;
    const { prompt, response, rating } = req.body;

    const results = await pool.query("SELECT * FROM chats WHERE chat_id = $1 AND user_id = $2", [id, req.user_id]);
    if (results.rowCount == 0)
        res.sendStatus(404);

    if (prompt)
        await pool.query("UPDATE chats SET prompt = $1 WHERE chat_id = $2", [prompt, id]);
    if (response)
        await pool.query("UPDATE chats SET response = $1 WHERE chat_id = $2", [response, id]);
    if (rating)
        await pool.query("UPDATE chats SET rating = $1 WHERE chat_id = $2", [rating, id]);

    res.sendStatus(204);
};

export const deleteChat = async (req, res) => {
    const { id } = req.params;

    const results = await pool.query("SELECT * FROM chats WHERE chat_id = $1 AND user_id = $2", [id, req.user_id]);
    if (results.rowCount == 0)
        res.sendStatus(404);

    await pool.query("DELETE FROM chats WHERE chat_id = $1", [id]);
    res.sendStatus(204);
};