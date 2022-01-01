import mongoose from "mongoose";

interface EventAttrs {
  title: string;
  detail: string;
  date: number;
  location: string;
  // userID: string;
}

interface EventModel extends mongoose.Model<EventDoc> {
  build(attrs: EventAttrs): EventDoc;
}

interface EventDoc extends mongoose.Document {
  title: string;
  detail: string;
  date: number;
  location: string;
  // userID: string;
}

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    detail: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

// ticketSchema.set("versionKey", "version");

eventSchema.statics.build = (attrs: EventAttrs) => {
  return new Event(attrs);
};

const Event = mongoose.model<EventDoc, EventModel>("NewEvents", eventSchema);

export { Event };
