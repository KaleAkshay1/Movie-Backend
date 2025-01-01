import { Schema, model } from "mongoose";

const slotSchema = new Schema(
  {
    movie: { type: Schema.Types.ObjectId, ref: "Movie", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    slot_time: { type: String, required: true },
    slot_date: { type: String, required: true },
  },
  { timestamps: true }
);

const Slot = model("Slot", slotSchema);

export default Slot;
