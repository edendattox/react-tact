import express, { Request, Response } from "express";
import { body } from "express-validator";
// import { requireAuth } from "../../middlewares/require-auth";
import { validateRequest } from "../../middlewares/validate-request";
import { Event } from "../../models/event";

const router = express.Router();

router.post(
  "/api/event",
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("detail").not().isEmpty().withMessage("Detail is required"),
    body("date").not().isEmpty().withMessage("Date is required"),
    body("location").not().isEmpty().withMessage("Location is required"),
  ],
  async (req: Request, res: Response) => {
    const { title, detail, date, location } = req.body;

    const event = Event.build({
      title,
      detail,
      date,
      location,
    });
    try {
      await event.save();
      res.status(201).send(event);
    } catch (err) {
      res.status(401).send(err);
    }
  }
);

export { router as createEventRouter };
