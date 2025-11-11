import express from 'express';
import cors from 'cors';
import sectionRouter from "./routes/section.js"


const app = express();
app.use(cors());
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.json());
app.set('view engine', 'ejs');

app.use('/sections', sectionRouter);

export { app }; 
