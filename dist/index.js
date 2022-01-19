"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const models_1 = require("./models");
const router_1 = __importDefault(require("./router"));
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded());
app.use(express_1.default.json());
// Port Host
const PORT = parseInt(process.env.PORT, 10) || 3000 || 8080;
// allow cors
app.use((0, cors_1.default)({
    credentials: true,
    origin: [
        "http://localhost:3000",
        //"북테즈 도메인",
    ],
}));
// route
app.use("/", router_1.default);
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
    console.log(`
    ################################################
    🛡️  Server listening on port: ${PORT} 🛡️
    ################################################
  `);
    // 시퀄라이즈 연결
    models_1.sequelize
        .authenticate()
        .then(() => __awaiter(void 0, void 0, void 0, function* () {
        console.log("✅ Connect PostgreSQL");
    }))
        .catch((err) => {
        console.log("TT : ", err);
    });
    // 시퀄라이즈 모델 DB에 싱크
    models_1.sequelize
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
//# sourceMappingURL=index.js.map