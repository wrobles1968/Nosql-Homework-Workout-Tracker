const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GymSchema = new Schema({
  Exercise: String,
  Reps: String
});

const Exercise = mongoose.model("Exercise", ExerciseSchema);

module.exports = Exercise;
