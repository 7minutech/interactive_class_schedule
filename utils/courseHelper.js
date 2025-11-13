import { db } from "../store/db.js"

export function fetchCourseBySubjectID(subjectID, callback) {
    db.get(`SELECT * FROM subject where num = ?`, [subjectName], (err, row) => {
        if (err) {
            callback(err, null)
        }   
        if (!row){
            callback(null, null)
        }
        callback(null, row.id)
    });
}