import express, { Request, Response } from "express";
import { body } from "express-validator";

import { Event } from "../../models/event";
// import { requireAuth } from "../../middlewares/require-auth";
import { validateRequest } from "../../middlewares/validate-request";
import { NotAuthorizedError } from "../../errors/not-authorized-error";
import { BadRequestError } from "../../errors/bad-request-error";
import { NotFoundError } from "../../errors/not-found-error";

const router = express.Router();

router.put(
  "/api/event/:id",
  // requireAuth,
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be greater than zero"),
  ],
  // validateRequest,
  async (req: Request, res: Response) => {
    const { title, detail, date, location } = req.body;

    const event = await Event.findById(req.params.id);

    if (!event) {
      throw new NotFoundError();
    }

    // @ts-ignore
    if (event.userID !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    event.set({
      title,
      detail,
      date,
      location,
      // userID: req.currentUser!.id,
    });

    await event.save();

    res.send(event);
  }
);

export { router as updateEventRouter };
