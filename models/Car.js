const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Car = new Schema({
  brand:    { type: String,   required: [ true, "Must know brand" ] },
  model:    { type: String,   required: [ true, "Must know model" ] },
  seats:    { type: Number,   required: [ true, "Must know seats" ] },
  gearbox:  { type: Boolean,  required: [ true, "Must know gearbox" ] },
  railing:  { type: Boolean,  required: [ true, "Must know railing" ] },
  price:    { type: Number,   required: [ true, "Must know price" ] },
  booked:	{ type: Boolean,  default: false},
  bookedFr: { type: Date},
  bookedTo: {type:Date},
  bookedBy: {type: String}
}, { timestamps: true });

module.exports = mongoose.model("Car", Car);
