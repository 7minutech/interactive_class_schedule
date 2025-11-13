import express from 'express';
import cors from 'cors';
import sectionRouter from "./routes/section.js"
import subjectRouter from "./routes/subject.js"



const app = express();
app.use(cors());
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.json());
app.set('view engine', 'ejs');

app.use('/sections', sectionRouter);
app.use('/subjects', subjectRouter);

export { app }; 
