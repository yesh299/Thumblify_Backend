import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db";
import session from "express-session";
import MongoStore from "connect-mongo";
import AuthRouter from "./server/routes/AuthRoutes.js";
import ThumbnailRouter from "./server/routes/ThumbnailRoutes";
import UserRouter from "./server/routes/UserRoutes";

declare module "express-session" {
  interface SessionData {
    isLoggedIn: boolean;
    userId: string;
  }
}

connectDB();

//* middleware

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://ai-thumbnail-generator-chi.vercel.app",
    ],
    credentials: true,
  }),
);

app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      path: "/",
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI as string,
      collectionName: "sessions",
    }),
  }),
);

app.use(express.json());

const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Server is Live!");
});
app.use("/api/auth", AuthRouter);
app.use("/api/thumbnail", ThumbnailRouter);
app.use("/api/user", UserRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
