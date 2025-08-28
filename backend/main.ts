import express, { Request, Response } from "express";
import Authorise from "./middlewares/Auth.ts";
import CookieParser from "cookie-parser";

const app = express();
const router = express.Router();
app.use(CookieParser());

router.get("/", Authorise, (req: Request, res: Response) => {
  res.send("Hello");
});

app.use(router);

app.listen(7777, () => {
  console.log("Server running at localhost:7777");
});
