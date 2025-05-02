import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import requestIp from "request-ip";
dotenv.config();
const app = express();
app.use(cors());
app.use(requestIp.mw());

import signinApi from "./controller/signin.js";
import jwtHelper from "./helper/jwt.js";
import chartApi from "./controller/chart.js";

//connecting to database
mongoose.connect(
    process.env.DATABASE_URL
);
const db = mongoose.connection;
db.on("error", (error) => {
    console.error("Connection error:", error);
});
db.once("open", () => {
    console.log("Connected to the database");
});
app.use(express.json());
app.use(requestIp.mw());
app.use((req, res, next) => {
    const time = new Date().toISOString();
    console.log(`[${time}] ${req.method} ${req.originalUrl} from IP: ${req.clientIp || req.ip}`);
    next();
});

app.use(express.urlencoded({ extended: false }));


app.get("/", (req, res) => {
    res.json({
        message: "backend is working",
    });
});

// routes
app.post("/signin", signinApi.signin);
app.get("/chart/lineChart", jwtHelper.verifyAuth, chartApi.getLineChartData);
app.get("/chart/pieChart", jwtHelper.verifyAuth, chartApi.getPieChartData);
app.post("/chart/save", jwtHelper.verifyAuth, chartApi.saveChartData);



const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});