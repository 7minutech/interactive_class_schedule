import express from 'express'
const router = express.Router();
import { db } from "../store/db.js"
import { fetchSubjectID } from '../utils/subjectHelper.js';

router.get('/', (req, resp) => {
    const { subjectName } = req.query; 

    db.get(`SELECT * FROM subject where name = ?`, [subjectName], (err, row) => {
        if (err) {
            resp.status(500).json({error: "database had error finding subject"})
        }   
        if (!row){
           resp.status(404).json({error: "subject not found"})
        }
        resp.status(200).json({id: row.id, name: row.name})
    });
});

export default router;