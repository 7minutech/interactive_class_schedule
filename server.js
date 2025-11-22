import express from 'express';
import cors from 'cors';
import sectionRouter from "./routes/section.js"
import subjectRouter from "./routes/subject.js"
import courseRouter from "./routes/course.js"
import levelRouter from "./routes/level.js"
import scheduleTypeRouter from "./routes/scheduleType.js"
import resultRouter from "./routes/result.js"
import termRouter from "./routes/term.js"

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
app.use(cors());
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.json());
app.set('view engine', 'ejs');
app.get('/search', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'search.html'));
});


app.use('/sections', sectionRouter);
app.use('/subjects', subjectRouter);
app.use('/courses', courseRouter);
app.use('/levels', levelRouter);
app.use('/scheduleTypes', scheduleTypeRouter)
app.use('/results', resultRouter);
app.use('/terms', termRouter);



export { app }; 
