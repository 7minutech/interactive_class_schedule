import express from 'express'
const router = express.Router();
import { db } from "../store/db.js"

router.get('/', (req, resp) => {
    const { description } = req.query; 

    if (!description || description === "all") {
        db.all(`SELECT * FROM scheduletype`, [], (err, rows) => {
            if (err) return resp.status(500).json({ error: "database had error finding schedule type" });
            if (!rows || rows.length === 0) return resp.status(404).json({ error: "schedule type not found" });
            resp.status(200).json(rows);
        });
    } 
    else {
        db.get(`SELECT * FROM scheduletype WHERE description = ?`, [description], (err, row) => {
            if (err) return resp.status(500).json({ error: "database had error finding schedule type" });
            if (!row) return resp.status(404).json({ error: "schedule type not found" });
            resp.status(200).json(row);
        });
    }
});

export default router;