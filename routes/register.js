import express from 'express'
const router = express.Router();
import { db } from "../store/db.js"

router.get('/', (req, resp) => {
    const { studentId, termId } = req.query; 

    if (!studentId || !termId) {
        resp.status(400).json({ error: "must include termId and studentId" })
        return
    } 

    let sql = `SELECT course.*, section.*,term.name AS termname, term.start AS termstart,
                term.end AS termend,scheduletype.description AS scheduletype, level.description AS level
                FROM registration
                JOIN section ON section.crn = registration.crn
                JOIN scheduletype ON section.scheduletypeid = scheduletype.id
                JOIN course ON section.num = course.num AND section.subjectid = course.subjectid
                JOIN level on course.levelid = level.id
                JOIN term on section.termid = term.id
                WHERE registration.studentid = ? AND registration.termid = ?
                ORDER BY course.num, section;
                `
    db.all(sql, [studentId, termId], (err, rows) => {
        if (err) return resp.status(500).json({ error: "database had error finding level" });
        if (!rows) return resp.status(404).json({ error: "registrations not found" });
        resp.status(200).json(rows);
    });
});

router.post('/', (req, resp) => {
    const { studentId, termId, crn} = req.body; 

    if (!studentId || !termId || !crn) {
        resp.status(400).json({ error: "must include termId and studentId and crn" })
        return
    } 

    db.get("SELECT * FROM section WHERE crn = ?", [crn], (err, row) => {

        if (err) return resp.status(500).json({ error: "database had error checking section existence" });
        if (!row) return resp.status(404).json({ error: "section was not found" });

        db.get("SELECT * FROM registration WHERE studentid = ? AND termId = ? AND crn = ?", [studentId, termId, crn], (err, row) => {

            if (err) return resp.status(500).json({ error: "database had error checking section existence" });
            if (row) return resp.status(200).json({});

            db.run("INSERT INTO registration (studentid, termid, crn) VALUES (?, ?, ?);", [studentId, termId, crn], (err) => {
                if (err) return resp.status(500).json({ error: "database had error adding section" });
                resp.status(200);
            });

        })
    })

    

    
});

router.delete('/', (req, resp) => {
    const { studentId, termId, crn} = req.body; 

    if (!studentId || !termId || !crn) {
        resp.status(400).json({ error: "must include termId and studentId and crn" })
        return
    } 

    db.get("SELECT * FROM registration WHERE studentid = ? AND termId = ? AND crn = ?", [studentId, termId, crn], (err, row) => {

        if (err) return resp.status(500).json({ error: "database had error checking section existence" });
        if (!row) return resp.status(404).json({ error: "section was not found" });

        db.run("DELETE FROM registration WHERE studentid = ? AND termid = ? AND crn = ?;", [studentId, termId, crn], (err) => {
        if (err) return resp.status(500).json({ error: "database had error droping section" });
        resp.status(200).json({});
    });

    })

});


export default router;