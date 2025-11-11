
import sqlite3 from 'sqlite3'; 

var db = new sqlite3.Database('store/jsu_sp26.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
        console.log('Connected to the database!');
});

export { db }