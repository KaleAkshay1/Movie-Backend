import { Schema, model } from "mongoose";

const bookingSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    slot_id: {
      type: Schema.Types.ObjectId,
      ref: "Slot",
      required: true,
    },
    seats: [
      {
        seat_numbers: {
          type: [Number],
          required: true,
        },
        package: {
          type: String,
          required: true,
          enum: ["silver", "gold", "platinum"],
        },
      },
    ],
  },
  { timestamps: true }
);

const Booking = model("Booking", bookingSchema);

export default Booking;
