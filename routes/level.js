import express from 'express'
const router = express.Router();
import { db } from "../store/db.js"

router.get('/', (req, resp) => {
    const { level } = req.query; 

    if (!level || level === "all") {
        db.all(`SELECT * FROM level`, [], (err, rows) => {
            if (err) return resp.status(500).json({ error: "database had error finding levels" });
            if (!rows || rows.length === 0) return resp.status(404).json({ error: "levels not found" });
            resp.status(200).json(rows);
        });
    } 
    else {
        db.get(`SELECT * FROM level WHERE description = ?`, [level], (err, row) => {
            if (err) return resp.status(500).json({ error: "database had error finding level" });
            if (!row) return resp.status(404).json({ error: "level not found" });
            resp.status(200).json(row);
        });
    }
});

export default router;