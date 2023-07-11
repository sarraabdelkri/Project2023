const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const app = express();
const passportSetup = require("./passport");
const passport = require("passport");
const authRoute = require("./route/authgo");
const mongoose = require("mongoose");
const userRouter = require("./route/userRoute");
const jobRouter = require("./route/jobRoute");
const courseRouter = require("./route/courseRoute")
const sessionRouter = require("./route/sessionRoute")
const assessmentRouter = require("./route/assessmentRoute")
const resultRouter = require("./route/resultRoute")
const session = require("express-session");
const dotenv = require("dotenv");
const contractRoute = require("./route/contract-routes");


dotenv.config();
require("dotenv").config();

app.use(
  cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL, process.env.FRONTEND_URL_HOSTNAME],
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

// configure session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
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

app.use("/contract", contractRoute);
app.use("/user", userRouter);
app.use("/course", courseRouter);
app.use("/session", sessionRouter);
app.use("/job", jobRouter);
app.use("/auth", authRoute);
app.use("/assessment", assessmentRouter);
app.use("/result", resultRouter);

