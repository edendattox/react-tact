import express from "express";

const router = express.Router();

router.get("/api/users/signout", (req, res) => {
  req.session = null;
  // req.cookies = null;
  res.send({ session: req.session, cookies: req.cookies });
});

export { router as signoutRouter };
