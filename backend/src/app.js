import express from 'express';import cors from 'cors';
export const app=express();
app.disable('x-powered-by');
app.use(cors({origin:process.env.FRONTEND_ORIGIN||'http://127.0.0.1:5173'}));
app.use(express.json({limit:'100kb'}));
app.get('/api/health',(_req,res)=>res.json({status:'ok',service:'secureshare-api',milestone:3}));
app.use((_req,res)=>res.status(404).json({error:'Not found'}));
