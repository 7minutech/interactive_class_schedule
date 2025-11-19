import express from 'express';
import cors from 'cors';
import sectionRouter from "./routes/section.js"
import subjectRouter from "./routes/subject.js"
import courseRouter from "./routes/course.js"
import levelRouter from "./routes/level.js"
import scheduleTypeRouter from "./routes/scheduleType.js"
import resultRouter from "./routes/result.js"

const app = express();
app.use(cors());
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.json());
app.set('view engine', 'ejs');

app.use('/sections', sectionRouter);
app.use('/subjects', subjectRouter);
app.use('/courses', courseRouter);
app.use('/levels', levelRouter);
app.use('/scheduleType', scheduleTypeRouter)
app.use('/results', resultRouter);



export { app }; 
