import dotenv from "dotenv";
dotenv.config();
import express from "express";
import db from "./database/db.js";
import morgan from "morgan";
import cors from "cors";

import userRouter from "./routes/user.js"
import tourRouter from "./routes/tour.js"

const PORT = process.env.PORT || 5001

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json({ limit: "30mb", extended: true }))
app.use(express.urlencoded({ limit: "30mb", extended: true }))

app.use("/users", userRouter)
app.use("/tour", tourRouter)


db();

app.listen(PORT, () => {
    console.log(`Server is listning at port ${PORT}`)
});