import pool from "../utils/postgres.js";

export const createContent = async (req, res) => {
    const { cls, course, subject, topic, content, link } = req.body;

    const result1 = await pool.query("SELECT * FROM class WHERE class_id = $1", [cls]);
    if (result1.rowCount == 0)
        await pool.query(
            "INSERT INTO class (class_id, name, code, search_key) VALUES ($1, $2, $3, $4)", 
            [cls, `Class ${cls}`, `C${cls}`, `class-${cls}`]
        );

    var course_id;
    const result2 = await pool.query("SELECT * FROM course WHERE name = $1 AND class_id = $2", [course, cls]);
    if (result2.rowCount == 0)
        course_id = (await pool.query(
            "INSERT INTO course (class_id, user_id, name) VALUES ($1, $2, $3) RETURNING course_id", 
            [cls, 1, course]
        )).rows[0].course_id;
    else
        course_id = result2.rows[0].course_id;

    var subject_id;
    const result3 = await pool.query("SELECT * FROM subject WHERE name = $1 AND course_id = $2", [subject, course_id]);
    if (result3.rowCount == 0)
        subject_id = (await pool.query(
            "INSERT INTO subject (course_id, name) VALUES ($1, $2) RETURNING subject_id", 
            [course_id, subject]
        )).rows[0].subject_id;
    else
        subject_id = result3.rows[0].subject_id;

    var topic_id;
    const result4 = await pool.query("SELECT * FROM topic WHERE name = $1 AND subject_id = $2", [topic, subject_id]);
    if (result4.rowCount == 0)
        topic_id = (await pool.query(
            "INSERT INTO topic (subject_id, name) VALUES ($1, $2) RETURNING topic_id", 
            [subject_id, topic]
        )).rows[0].topic_id;
    else
        topic_id = result4.rows[0].topic_id;

    const result5 = await pool.query("SELECT * FROM content WHERE topic_id = $1 AND link = $2", [topic_id, link]);
    if (result5.rowCount > 0)
        return res.sendStatus(409);
    const content_id = (await pool.query(
        "INSERT INTO content (topic_id, name, link) VALUES ($1, $2, $3) RETURNING content_id",
        [topic_id, content, link]
    )).rows[0].content_id;

    exec(`python `)

    res.json({ content_id });
};