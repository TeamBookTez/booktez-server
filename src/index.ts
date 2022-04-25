import express from "express";
import cors from "cors";
import router from "./router";
import connectDB from "./loader/db";
import config from "./config";

// scheduler
import { userScan } from "./scheduler/userScheduler";

const app = express();

// Connect Database
connectDB();

app.use(express.urlencoded());
app.use(express.json());

// Port Host
const PORT: number = config.port || 3000 || 8080;

// allow cors
app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:3000",
      "https://dev.book-stairs.com",
      "https://api.book-stairs.com",
      "https://book-stairs.com",
    ],
  })
);

// route
app.use("/", router);

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "production" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });

  // scheduler
  userScan;
});

const server = app
  .listen(PORT, () => {
    console.log(
      `
    ##############################################
    🛡️  Server listening on port: ${PORT} 🛡️
    ##############################################
  `
    );
  })
  .on("error", (err) => {
    console.error(err);
    process.exit(1);
  });

server.timeout = 1000000;
