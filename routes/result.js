import express from 'express'
const router = express.Router();
import { dayList } from '../utils/daysHelper.js';
import { db } from "../store/db.js"

router.get('/', (req, resp) => {
    const { subject, courseNumber, subjectType, courseLevel, start, end, days } = req.query; 


    let params = [subject, courseNumber, subjectType, courseLevel]

    let sql = `SELECT course.description AS course_desc, sec.crn, sec.subjectid, sec.section,
                        term.name as term_name, term.start as term_start, term.end as term_end,
                    level.description AS level_desc, sec.num, course.credits, 
                        sec.start, sec.end, sec.days, sec.location, scheduletype.description AS type_desc, 
                        sec.instructor
                FROM section AS sec
                JOIN course ON course.num = sec.num AND course.subjectid = sec.subjectid
                JOIN term ON sec.termid = term.id
                JOIN level ON course.levelid = level.id
                JOIN scheduletype ON sec.scheduletypeid = scheduletype.id
                WHERE sec.subjectid = ?
                AND sec.num = ?
                AND scheduletype.id = ?
                AND level.id = ?
                `
    
    if (start && end) {
        let timeSQL = "AND sec.start = ?  AND sec.end = ?"
        sql += timeSQL
        params.push(start, end)
    }

    if (days) {
        let parsedDays = dayList(days)
        let dayConditions = parsedDays.map(() => `sec.days LIKE ?`).join(" OR ");
        let dayParams = parsedDays.map(day => `%${day}%`);

        let daySQL = `AND (${dayConditions})`
        sql += daySQL
        params.push(...dayParams)
    }
    
    sql += ";"

    db.all(sql, params, (err, rows) => {
        if (err) return resp.status(500).json({ error: "database had error finding sections" });
        if (!rows || rows.length === 0) return resp.status(404).json({ error: "sections not found" });
        resp.status(200).json(rows);
    });


});

export default router;