import * as dotenv from "dotenv";
dotenv.config();

import path from "path";
const cors = require("cors");
import express, { NextFunction } from "express";
import apiRouter from "./routers/api";
import connectDB from "./config/prisma";

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/public", express.static(path.join(__dirname, "public")));

app.use("/api", apiRouter);

// app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
//   return res.status(500).json({ message: err.message });
// });

app.listen(process.env.PORT, async () => {
  await connectDB();
  console.log(`Server listening at http://localhost:${process.env.PORT}`);
});
