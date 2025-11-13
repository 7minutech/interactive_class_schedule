import express from 'express'
const router = express.Router();
import { db } from "../store/db.js"
import { fetchSubjectID } from '../utils/subjectHelper.js';

router.get('/', (req, resp) => {
    const { courseNum } = req.query; 

    db.all(`SELECT * FROM course where num = ?`, [courseNum], (err, rows) => {
        if (err) {
            resp.status(500).json({error: "database had error finding courses"})
        }   
        if (!rows){
           resp.status(404).json({error: "courses not found"})
        }
        resp.status(200).json(rows)
    });
});

export default router;