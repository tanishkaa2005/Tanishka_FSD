const mongoose = require("mongoose");

const PassengerSchema = new mongoose.Schema(
  {
    passengerName: { type: String, required: true, trim: true },
    from: { type: String, required: true, trim: true },
    to: { type: String, required: true, trim: true },
    date: { type: Date, required: true },
    departureDate: { type: Date, required: true },
    arrivalDate: { type: Date, required: true },
    phoneNumber: { type: String, required: true, unique: true, trim: true },
    emailId: { type: String, required: true, lowercase: true, trim: true },
  },
  { timestamps: true }
);

PassengerSchema.index({ phoneNumber: 1 }, { unique: true });

module.exports = mongoose.model("Passenger", PassengerSchema);

