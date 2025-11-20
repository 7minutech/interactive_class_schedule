import express from 'express'
const router = express.Router();
import { db } from "../store/db.js"

router.get('/', (req, resp) => {

    db.all(`SELECT * FROM term`, [], (err, rows) => {
        if (err) return resp.status(500).json({error: "database had error finding terms"})  
        if (!rows) return resp.status(404).json({error: "terms not found"})
        resp.status(200).json(rows)
    });

});

export default router;