import express, { Request, Response } from "express";
import { Event } from "../../models/event";
import { NotFoundError } from "../../errors/not-found-error";

const router = express.Router();

router.delete("/api/event/:id", async (req: Request, res: Response) => {
  const event = await Event.findByIdAndDelete(req.params.id);

  if (!event) {
    throw new NotFoundError();
  }

  res.send(event);
});

export { router as deleteEventRouter };
