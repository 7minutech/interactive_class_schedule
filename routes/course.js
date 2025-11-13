import express from 'express'
const router = express.Router();
import { db } from "../store/db.js"
import { fetchSubjectID } from '../utils/subjectHelper.js';

router.get('/', (req, resp) => {
    const { courseNum, subjectID } = req.query; 

    if (!courseNum) {
        db.all(`SELECT * FROM course`, [], (err, rows) => {
            if (err) return resp.status(500).json({error: "database had error finding courses"})  
            if (!rows) return resp.status(404).json({error: "courses not found"})
            resp.status(200).json(rows)
        });
    }
    else if (courseNum && subjectID) {
         db.get(`SELECT * FROM course where num = ? AND subjectid = ?`, [courseNum, subjectID], (err, row) => {
            if (err) return resp.status(500).json({error: "database had error finding courses"})  
            if (!row) return resp.status(404).json({error: "courses not found"})
            resp.status(200).json(row)
        });
    }
    else {
        db.all(`SELECT * FROM course where num = ?`, [courseNum], (err, rows) => {
            if (err) return resp.status(500).json({error: "database had error finding courses"}) 
            if (!rows) return resp.status(404).json({error: "courses not found"})
            resp.status(200).json(rows)
        });
    }

   
});

export default router;