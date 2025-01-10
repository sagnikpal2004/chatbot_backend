import { exec } from 'child_process';

export const queryRouter = (req, res) => {
    const { course_id, query } = req.body;
    console.log(course_id, query);

    exec(`python src/utils/vectorstore.py ${course_id} "${query}"`, (err, stdout, stderr) => {
        if (err)
            return res.status(500).send(stderr);
        return res.status(200).json(JSON.parse(stdout));
    });
}