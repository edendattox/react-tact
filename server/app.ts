import express, { Express } from "express";
import "express-async-errors";
import { json } from "body-parser";
import cors from "cors";
import cookieSession from "cookie-session";
const dotenv = require("dotenv");
dotenv.config();

/**
 * ErrorHandlers
 */

import { NotFoundError } from "./errors/not-found-error";
import { errorHandler } from "./middlewares/error-handler";

/**
 *  User Routes
 */

import { currentUserRouter } from "./routes/user/current-user";
import { signinRouter } from "./routes/user/signin";
import { signoutRouter } from "./routes/user/signout";
import { signupRouter } from "./routes/user/signup";

/**
 *  Event Routes
 */

import { createEventRouter } from "./routes/event/create";
import { deleteEventRouter } from "./routes/event/delete";
import { detailEventRouter } from "./routes/event/detail";
import { indexEventRouter } from "./routes/event/index";
import { updateEventRouter } from "./routes/event/update";
import { currentUser } from "./middlewares/current-user";

const app: Express = express();

app.use(cors());
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);
app.use(currentUser);

/**
 * User Routers
 */

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

/**
 * Event Routers
 */

app.use(createEventRouter);
app.use(deleteEventRouter);
app.use(detailEventRouter);
app.use(indexEventRouter);
app.use(updateEventRouter);

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
