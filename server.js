const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/populatedb", { useNewUrlParser: true });

db.Gym.create({ name: "Burpees" })
  .then(dbGym => {
    console.log(dbGym);
  })
  .catch(({ message }) => {
    console.log(message);
  });

app.get("/exercise", (req, res) => {
  db.Note.find({})
    .then(dbExercise => {
      res.json(dbExercise);
    })
    .catch(err => {
      res.json(err);
    });
});

app.get("/gym", (req, res) => {
  db.User.find({})
    .then(dbGym => {
      res.json(dbGym);
    })
    .catch(err => {
      res.json(err);
    });
});

app.post("/submit", ({ body }, res) => {
  db.dbExercise.create(body)
    .then(({ _id }) => db.Gym.findOneAndUpdate({}, { $push: { notes: _id } }, { new: true }))
    .then(dbGym => {
      res.json(dbGym);
    })
    .catch(err => {
      res.json(err);
    });
});

app.get("/populateduser", (req, res) => {
  db.Gym.find({})
    .populate("exercises")
    .then(dbGym => {
      res.json(dbGym);
    })
    .catch(err => {
      res.json(err);
    });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
