import express from 'express'
const router = express.Router();
import { toNull } from '../utils/nullHelper.js';
import { db } from "../store/db.js"

router.get('/', (req, resp) => {
    const { subject, courseNumber, scheduleType, start, end, days, termId } = req.query;

    if (!termId) {
        return resp.status(400).json({ error: "termId is required" });
    }


    const subjectId = toNull(subject);
    const num = toNull(courseNumber);
    const scheduleTypeId = toNull(scheduleType);
    const startTime = toNull(start);
    const endTime = toNull(end);

    const daysGlob = days ? `*[${days}]*` : null;

    const params = [
        subjectId, subjectId,       // 1 & 2
        num, num,                   // 3 & 4
        scheduleTypeId, scheduleTypeId, // 5 & 6
        startTime, startTime,       // 7 & 8
        endTime, endTime,           // 9 & 10
        daysGlob, daysGlob,         // 11 & 12
        termId                      // 13 (required)
    ];

    const sql = `
        SELECT course.*, section.*,
           term.name AS termname, term.start AS termstart, term.end AS termend,
           scheduletype.description AS scheduletype, level.description AS level
        FROM ((((section
        JOIN scheduletype ON section.scheduletypeid = scheduletype.id)
        JOIN course ON section.subjectid = course.subjectid AND section.num = course.num)
        JOIN level ON course.levelid = level.id)
        JOIN term ON section.termid = term.id)
        WHERE ((? IS NULL OR course.subjectid = ?)
        AND   (? IS NULL OR course.num = ?)
        AND   (? IS NULL OR section.scheduletypeid = ?)
        AND   (? IS NULL OR section.start >= ?)
        AND   (? IS NULL OR section.end <= ?)
        AND   (? IS NULL OR section.days GLOB ?)
        AND   section.termid = ?)
        ORDER BY course.num, section;
    `;

    db.all(sql, params, (err, rows) => {
        if (err) return resp.status(500).json({ error: "Database query error", details: err });
        if (!rows || rows.length === 0) return resp.status(200).json([]);
        resp.status(200).json(rows);
    });
});


export default router;