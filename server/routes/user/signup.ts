import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { body } from "express-validator";
import { BadRequestError } from "../../errors/bad-request-error";
import { validateRequest } from "../../middlewares/validate-request";
import { User } from "../../models/user";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("username").notEmpty().withMessage("Username must be provided"),
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError("Email in use");
    }

    const user = User.build({ username, email, password });
    await user.save();

    // Generate JWT

    const payload = {
      username: user.username,
      id: user.id,
      email: user.email,
    };

    const userJwt = jwt.sign(payload, process.env.JWT_KEY!, {
      expiresIn: "1d",
    });

    // Store it on session object
    // ts-ignore: silly error
    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(user);
  }
);

export { router as signupRouter };
