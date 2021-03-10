import express from "express";
import routes from "./routes";
import cors from 'cors';

import "./database";

const app = express();
app.use(cors({
   exposedHeaders: ['Content-Disposition'],
}))
app.use(express.json());
app.use(routes);

export default app;
