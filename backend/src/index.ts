import 'dotenv/config';
import { clerkMiddleware } from '@clerk/express'
import express from "express";
import cors from "cors";
import { clerkWebhookHandler } from './webhooks/clerk';
import { getEnv } from './lib/env';

const env = getEnv();
const app = express();

const rawJson = express.raw({type:"application/json", limit:"1mb"});
// webhook event
app.post("/webhook/clerk", (req,res)=>{
    void clerkWebhookHandler(req,res);
})

app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());



app.listen(3001, ()=> console.log("listening on port ",env.PORT));