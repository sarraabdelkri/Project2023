const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const userRouter = require("./route/userRoute");
const jobRouter = require("./route/jobRoute");
const courseRouter = require("./route/courseRoute");
const sessionRouter = require("./route/sessionRoute");
const assessmentRouter = require("./route/assessmentRoute");
const resultRouter = require("./route/resultRoute");
const dotenv = require("dotenv");
const contractRoute = require("./route/contract-routes");
const notificationRouter = require("./route/notificationRoute");
const applicationRouter = require("./route/applicationRoute");
const reviewRoute = require("./route/reviewRoute");
const atelierRoute = require("./route/atelierRoute");
const jobScrapeRoute = require("./route/jobScrapeRoute");
const path = require("path");

dotenv.config();
require("dotenv").config();

app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL,
      process.env.FRONTEND_URL_HOSTNAME,
      process.env.DASHBOARD_URL,
      process.env.DASHBOARD_URL_HOSTNAME,
      process.env.DASHBOARD_HOSTED,
      process.env.BACKEND_URL_HOSTNAME,
      process.env.HOSTED_URL,
    ],
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//connecting to db
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.DB_MONGO)
  .then(() => console.log("CONNECTED TO DB"))
  .then(() => app.listen(process.env.BACKEND_PORT))
  .catch((err) => console.log(err));

app.use("/api/contract", contractRoute);
app.use("/api/user", userRouter);
app.use("/api/course", courseRouter);
app.use("/api/session", sessionRouter);
app.use("/api/job", jobRouter);
app.use("/api/other-jobs", jobScrapeRoute);
app.use("/api/assessment", assessmentRouter);
app.use("/api/result", resultRouter);
app.use("/api/notification", notificationRouter);
app.use("/api/application", applicationRouter);
app.use("/api/review", reviewRoute);
app.use("/api/atelier", atelierRoute);
app.use("/api/uploads", express.static(path.join(__dirname, "uploads")));

// if (process.env.NODE_ENV == 'production') {npm ru
app.use(express.static("../client/dist"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "client", "dist", "index.html"));
});
// }
