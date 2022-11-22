import express, { Express } from "express";
import {config as configEnv} from 'dotenv';
import rootRouter from "./routes";
import cors from 'cors';

configEnv();

const api: Express = express()
const port = process.env.API_PORT || 3002;

api.use(cors({
  origin: '*',
}))

api.use(rootRouter);

api.listen(port, () => {
  console.log(`[API]: API is running at http://localhost:${port}`);
});
