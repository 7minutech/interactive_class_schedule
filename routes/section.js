import express from 'express'
const router = express.Router();
import { db } from "../store/db.js"
import { dayList } from '../utils/daysHelper.js';

router.get('/', (req, resp) => {
    const { start, end, days } = req.query; 
    if (start && end) {
        db.all(`SELECT * FROM section where start = ? AND end = ?`, [start, end], (err, rows) => {
            if (err) return resp.status(500).json({ error: "database had error finding sections" });
            if (!rows || rows.length === 0) return resp.status(404).json({ error: "sections not found" });
            resp.status(200).json(rows);
        });
    } 
    else if (days) {
        let parsedDays = dayList(days)

        let conditions = parsedDays.map(() => `days LIKE ?`).join(" OR ");
        let params = parsedDays.map(day => `%${day}%`);

        let sql = `SELECT * FROM section WHERE ${conditions}`;

        db.all(sql, params, (err, rows) => {
            if (err) return res.status(500).json({ error: "Database error" });
            resp.status(200).json(rows);
        });
    }
    else {
        db.all(`SELECT * FROM section`, [], (err, rows) => {
            if (err) return resp.status(500).json({ error: "database had error finding section" });
            if (!rows) return resp.status(404).json({ error: "section not found" });
            resp.status(200).json(rows);
        });
    }
});

export default router;