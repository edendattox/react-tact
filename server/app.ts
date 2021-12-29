import express, { Express } from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
const dotenv = require("dotenv");
dotenv.config();

/**
 * ErrorHandlers
 */

import { NotFoundError } from "./errors/not-found-error";
import { errorHandler } from "./middlewares/error-handler";

/**
 * Routes
 */
import { currentUserRouter } from "./routes/user/current-user";
import { signinRouter } from "./routes/user/signin";
import { signoutRouter } from "./routes/user/signout";
import { signupRouter } from "./routes/user/signup";

const app: Express = express();
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);

/**
 * Routers
 */

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

/**
 *  Create error for the route that does'nt exits.
 *  app.all gonna watch for any type of method for req
 */
app.all("*", async (req, res) => {
  throw new NotFoundError();
});

/**
 *  Middlewares
 */
app.use(errorHandler);

export { app };
