import express from 'express'
const router = express.Router();
import { db } from "../store/db.js"
import { fetchSubjectID } from '../utils/subjectHelper.js';

router.get('/', (req, resp) => {
    const { subjectID } = req.query;
    
    if (!subjectID) {
        db.all(`SELECT * FROM subject`, [], (err, rows) => {
            if (err) return resp.status(500).json({error: "database had error finding subjects"})
            if (!rows) return resp.status(404).json({error: "subjects not found"})
            resp.status(200).json(rows)
        });
    }
    else {
        db.get(`SELECT * FROM subject where id = ?`, [subjectID], (err, row) => {
            if (err) return resp.status(500).json({error: "database had error finding subject"})
            if (!row) return resp.status(404).json({error: "subject not found"})
            resp.status(200).json(row)
        });
    }


});

export default router;