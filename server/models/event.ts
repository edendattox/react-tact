import mongoose from "mongoose";

interface EventAttrs {
  title: string;
  details: string;
  date: number;
  location: string;
}

interface EventDoc extends mongoose.Document {
  title: string;
  details: string;
  date: number;
  location: string;
}

interface EventModel extends mongoose.Model<EventDoc> {
  build(attrs: EventAttrs): EventDoc;
}

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    date: {
      type: Number,
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

const Event = mongoose.model<EventDoc, EventModel>("Event", eventSchema);

export { Event };
