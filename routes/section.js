import express from 'express'
const router = express.Router();
import { db } from "../store/db.js"
import { fetchSubjectID } from '../utils/subjectHelper.js';

router.post('/', (req, resp) => {
    const { subjectName, courseNumber, scheduleType, courseLevel, startTime, endTime, weekDays } = req.body; 

    fetchSubjectID(subjectName, (err, subjectID) => {
        if (err) {
            resp.status(500).json({error: "could not fetch subject"})
        }
        if (subjectID === null) {
            resp.status(404).json({error: "could not find subject"})
        }

        db.all("select , description from sesion", [], (err, rows) => {
            if (err) {
                return res.status(500).json({error: err.message});
            }
            resp.render("new_attendee", { sessions: rows });
    });
    })
});

export default router;