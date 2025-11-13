import express from 'express'
const router = express.Router();
import { db } from "../store/db.js"
import { fetchSubjectID } from '../utils/subjectHelper.js';

router.get('/', (req, resp) => {
    const { start, end } = req.query; 
    if (start && end) {
        db.all(`SELECT * FROM section where start = ? AND end = ?`, [start, end], (err, rows) => {
            if (err) return resp.status(500).json({ error: "database had error finding sections" });
            if (!rows || rows.length === 0) return resp.status(404).json({ error: "sections not found" });
            resp.status(200).json(rows);
        });
    } 
    else {
        db.all(`SELECT * FROM section`, [level], (err, rows) => {
            if (err) return resp.status(500).json({ error: "database had error finding level" });
            if (!rows) return resp.status(404).json({ error: "level not found" });
            resp.status(200).json(rows);
        });
    }
});

export default router;