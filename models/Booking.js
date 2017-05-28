const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Booking = new Schema({
  bookedFr: { type: Date },
  bookedTo: { type: Date }
});

module.exports = mongoose.model("Booking", Booking);
