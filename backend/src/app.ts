import express from 'express';
import { corsLite } from './features/middlewares/cors';

const app = express();

app.use(corsLite);    
app.use(express.json());

export default app;
