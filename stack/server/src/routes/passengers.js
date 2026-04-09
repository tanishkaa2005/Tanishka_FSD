const express = require("express");
const Passenger = require("../models/Passenger");

const router = express.Router();

function isValidEmail(email) {
  return typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function normalizePhone(phone) {
  return String(phone ?? "").trim();
}

// 1) Insert passenger details
router.post("/", async (req, res) => {
  try {
    const payload = req.body ?? {};
    const phoneNumber = normalizePhone(payload.phoneNumber);

    if (!phoneNumber) return res.status(400).json({ message: "phoneNumber is required" });
    if (!isValidEmail(payload.emailId)) return res.status(400).json({ message: "emailId is invalid" });

    const created = await Passenger.create({
      passengerName: payload.passengerName,
      from: payload.from,
      to: payload.to,
      date: payload.date,
      departureDate: payload.departureDate,
      arrivalDate: payload.arrivalDate,
      phoneNumber,
      emailId: payload.emailId,
    });

    return res.status(201).json(created);
  } catch (err) {
    if (err?.code === 11000) {
      return res.status(409).json({ message: "Passenger with this phoneNumber already exists" });
    }
    return res.status(500).json({ message: "Server error" });
  }
});

// 4) View all booking details in tabular UI (API list)
router.get("/", async (_req, res) => {
  try {
    const list = await Passenger.find().sort({ updatedAt: -1 }).lean();
    return res.json(list);
  } catch {
    return res.status(500).json({ message: "Server error" });
  }
});

// Helper: fetch by phone (used by UI search/update)
router.get("/:phoneNumber", async (req, res) => {
  try {
    const phoneNumber = normalizePhone(req.params.phoneNumber);
    const found = await Passenger.findOne({ phoneNumber }).lean();
    if (!found) return res.status(404).json({ message: "Record not found" });
    return res.json(found);
  } catch {
    return res.status(500).json({ message: "Server error" });
  }
});

// 3) Update passenger details based on Phone Number
router.put("/:phoneNumber", async (req, res) => {
  try {
    const phoneNumber = normalizePhone(req.params.phoneNumber);
    const payload = req.body ?? {};

    if (payload.emailId != null && !isValidEmail(payload.emailId)) {
      return res.status(400).json({ message: "emailId is invalid" });
    }

    const updated = await Passenger.findOneAndUpdate(
      { phoneNumber },
      {
        $set: {
          passengerName: payload.passengerName,
          from: payload.from,
          to: payload.to,
          date: payload.date,
          departureDate: payload.departureDate,
          arrivalDate: payload.arrivalDate,
          emailId: payload.emailId,
        },
      },
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ message: "Record not found" });
    return res.json(updated);
  } catch {
    return res.status(500).json({ message: "Server error" });
  }
});

// 2) Delete passenger records based on Phone Number
router.delete("/:phoneNumber", async (req, res) => {
  try {
    const phoneNumber = normalizePhone(req.params.phoneNumber);
    const deleted = await Passenger.findOneAndDelete({ phoneNumber });
    if (!deleted) return res.status(404).json({ message: "Record not found" });
    return res.json({ message: "Deleted", phoneNumber });
  } catch {
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

