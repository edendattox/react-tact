import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be provided");
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be provided");
  }

  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  };

  try {
    await mongoose.connect(process.env.MONGO_URI, options);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error(err);
  }

  app.listen(process.env.PORT || 4000, () => {
    console.log("Listening on port 3000!");
  });
};

start();
