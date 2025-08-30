import logger from 'jet-logger';

import ENV from '@src/common/constants/ENV';
import server from './server';


/******************************************************************************
                                Constants
******************************************************************************/

const SERVER_START_MSG = (
  'Express server started on port: ' + ENV.Port.toString()
);


/******************************************************************************
                                  Run
******************************************************************************/

// Start the server
server.listen(ENV.Port, err => {
  if (!!err) {
    logger.err(err.message);
  } else {
    logger.info(SERVER_START_MSG);
  }
});

/*
* import express, { Request, Response } from "express";
import Authorise from "./middlewares/Auth.ts";
import CookieParser from "cookie-parser";
import Logger from "./middlewares/logger.ts";
import CreateJWT from "./funcs/CreateJWT.ts";

const app = express();
const router = express.Router();
app.use(express.json());
app.use(CookieParser());
app.use(Logger);

const some_demo_loginss = {
  userid: 1,
  email: "abcd@abcd.com",
  password: "abcd",
};

router.post("/login", (req: Request, res: Response) => {
  let cookie = req.cookies;
  //console.log(cookie);
  let body = req?.body;
  //console.log(body);
  if (
    body.email == some_demo_loginss.email &&
    body.password == some_demo_loginss.password
  ) {
    let jwt = CreateJWT(some_demo_loginss.userid);
    res.setHeader("Set-Cookie", `login=${jwt}`);
    res.send(jwt);
  } else {
    res.sendStatus(401);
    res.send({ error: "Not authorised" });
  }
});

router.get("/protected", Authorise, (req: Request, res: Response) => {
  res.send("Hell yea baby it works");
});

app.use(router);

app.listen(7777, () => {
  console.log("Server running at localhost:7777");
});
* */