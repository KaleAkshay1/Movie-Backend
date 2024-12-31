import { Schema, model } from "mongoose";

const slotSchema = new Schema(
  {
    movie_id: { type: Schema.Types.ObjectId, ref: "Movie", required: true },
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    slot_time: { type: String, required: true },
    slot_date: { type: Date, required: true },
  },
  { timestamps: true }
);

const Slot = model("Slot", slotSchema);

export default Slot;
