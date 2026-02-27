import express from 'express';
import { corsLite } from './middleware/cors';

const app = express();
app.use(corsLite);    
app.use(express.json());

export default app;
