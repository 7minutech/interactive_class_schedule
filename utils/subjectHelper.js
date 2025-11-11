import { db } from "../store/db.js"

export function fetchSubjectID(subjectName, callback) {
    db.get(`SELECT id FROM subject where name = ?`, [subjectName], (err, row) => {
        if (err) {
            callback(err, null)
        }   
        if (!row){
            callback(null, null)
        }
        callback(null, row.id)
    });
}