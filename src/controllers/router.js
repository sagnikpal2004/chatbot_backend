import { exec } from 'child_process';

export const queryRouter = (req, res) => {
    const { course_id, query } = req.body;

    const startTime = new Date();
    exec(`python src/utils/vectorstore.py QUERY2 ${course_id} "${query}"`, (err, stdout, stderr) => {
        const endTime = new Date();
        const duration = (endTime - startTime) / 1000;
        console.log(`Execution Time: ${duration.toFixed(2)} seconds`)

        if (err)
            return res.status(500).send(stderr);
        return res.status(200).json(JSON.parse(stdout));
    });
}