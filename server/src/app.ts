import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes/routes";

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// router;
app.use("/api", router);

app.use((req: Request, res: Response, next: NextFunction) => {
  res
    .status(404)
    .json({ success: false, message: "Not Found", path: req.path });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: "Internal Server Error",
    stack: err.stack,
  });
});

export default app;
