"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const db_1 = __importDefault(require("./configs/db"));
const express_session_1 = __importDefault(require("express-session"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const AuthRoutes_js_1 = __importDefault(require("./server/routes/AuthRoutes.js"));
const thumbnailRoutes_1 = __importDefault(require("./server/routes/thumbnailRoutes"));
const UserRoutes_1 = __importDefault(require("./server/routes/UserRoutes"));
(0, db_1.default)();
//* middleware
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
}));
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 }, // 7 DAYS
    store: connect_mongo_1.default.create({
        mongoUrl: process.env.MONGODB_URI,
        collectionName: "sessions",
    }),
}));
app.use(express_1.default.json());
const port = process.env.PORT || 3000;
app.get("/", (req, res) => {
    res.send("Server is Live!");
});
app.use("/api/auth", AuthRoutes_js_1.default);
app.use("/api/thumbnail", thumbnailRoutes_1.default);
app.use("/api/user", UserRoutes_1.default);
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
