const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GymSchema = new Schema({
  name: {
    type: String,
    unique: true
  },
  Exercises: [
    {
      type: Schema.Types.ObjectId,
      ref: "Exercise"
    }
  ]
});

const Gym = mongoose.model("Gym", GymSchema);

module.exports = Gym;
