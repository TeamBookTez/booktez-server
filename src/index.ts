import express from "express";
import cors from "cors";
import { sequelize } from "./models";
import router from "./router";

const app = express();

app.use(express.urlencoded());
app.use(express.json());

// Port Host
const PORT: number = parseInt(process.env.PORT as string, 10) || 3000 || 8080;

// allow cors
app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:3000",
      //"북테즈 도메인",
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
});

const server = app
  .listen(PORT, () => {
    console.log(
      `
    ################################################
    🛡️  Server listening on port: ${PORT} 🛡️
    ################################################
  `
    );

    // 시퀄라이즈 연결
    sequelize
      .authenticate()
      .then(async () => {
        console.log("✅ Connect PostgreSQL");
      })
      .catch((err) => {
        console.log("TT : ", err);
      });

    // 시퀄라이즈 모델 DB에 싱크
    sequelize
      .sync({ force: false })
      .then(() => {
        console.log("✅ Sync Models to DB");
      })
      .catch((err) => {
        console.error(err);
      });
  })
  .on("error", (err) => {
    console.error(err);
    process.exit(1);
  });

server.timeout = 1000000;
