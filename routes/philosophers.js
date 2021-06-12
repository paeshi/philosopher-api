const express = require("express");
const { route } = require("../../../alien-api/routes/aliens");
const router = express.Router();
const Philosopher = require("../models/philosopher");

router.get("/", async (req, res) => {
  try {
    const philosophers = await Philosopher.find();
    res.json(philosophers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", getPhilosopher, (req, res) => {
  res.json(res.philosopher);
});

router.post("/", async (req, res) => {
  const philosopher = new Philosopher({
    name: req.body.name,
    years: req.body.years,
    image: req.body.image,
    description: req.body.description,
    teachings: req.body.teachings,
    quotes: req.body.quotes,
  });
  try {
    const newPhilosopher = await philosopher.save();
    res.status(201).json(newPhilosopher);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.patch("/:id", getPhilosopher, async (req, res) => {
  res.philosopher.name = req.body.name;
  res.philosopher.years = req.body.years;
  res.philosopher.image = req.body.image;
  res.philosopher.description = req.body.description;
  res.philosopher.philosophy = req.body.philosophy;
  res.philosopher.teaching = req.body.teaching;
  res.philosopher.quotes = req.body.quotes;

  try {
    const updatedPhilosopher = await res.philosopher.save();
    res.json(updatedPhilosopher);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", getPhilosopher, async (req, res) => {
  try {
    await res.philosopher.remove();
    res.json({ message: "Deleted Philosopher" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getPhilosopher(req, res, next) {
  let philosopher;
  try {
    philosopher = await Philosopher.findById(req.params.id);
    if (philosopher == null) {
      return res.status(404).json({ message: "Cannot find data" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.philosopher = philosopher;
  next();
}

module.exports = router;
