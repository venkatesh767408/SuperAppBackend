import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import express from "express";
//import jwt from "jsonwebtoken";

// Models
import Team from "./gamemodules/team/team.model.js";



dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ---------------- Connect to MongoDB ----------------
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

//create teams
app.post("/teams", async (req, res) => {
  try {
    const { name,sport,agegroup,coachid ,teamtype,city,season} = req.body;
    if (!name || !sport || !agegroup || !coachid || !teamtype || !city || !season)
      return res.status(400).json({ message: "All fields are required" });
    const newTeam = new Team({ name,sport,agegroup,coachid,teamtype,city,season });
    await newTeam.save();
    res.json(newTeam);
  } catch (error) {
    res.status(500).json({ message: "Error creating team", error });
  }
});


// Get all teams
app.get("/teams", async (req, res) => {
  try {
    const teams = await Team.find();
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: "Error fetching teams", error });
  }
});

//get team by id
app.get("/:teamid", async (req, res) => {
  try {
    const team = await Team.findById(req.params.teamid);
    if (!team) return res.status(404).json({ message: "Team not found" });
    res.json(team);
  }
  catch (error) {
    res.status(500).json({ message: "Error fetching team", error });
  }
});

//update team by id
app.patch("/:teamid", async (req, res) => {
  try {
    const updatedTeam = await Team.findByIdAndUpdate(
      req.params.teamid,
      req.body,
      { new: true }
    );
    if (!updatedTeam) return res.status(404).json({ message: "Team not found" });
    res.json(updatedTeam);
  }
  catch (error) {
    res.status(500).json({ message: "Error updating team", error });
  }
});

//delete team by id
app.delete("/:teamid", async (req, res) => {
  try {
    const deletedTeam = await Team.findByIdAndDelete(req.params.teamid);
    if (!deletedTeam) return res.status(404).json({ message: "Team not found" });
    res.json({ message: "Team deleted successfully" });
  }
  catch (error) {
    res.status(500).json({ message: "Error deleting team", error });
  }
});

//add a player to a team
app.patch("/:teamid/addplayers", async (req, res) => {
  try {
    const team = await Team.findById(req.params.teamid);
    if (!team) return res.status(404).json({ message: "Team not found" });

    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // prevent duplicates
    if (!team.players.includes(email)) {
      team.players.push(email);
    }

    await team.save();
    res.json(team);
  } catch (error) {
    res.status(500).json({ message: "Error adding player to team", error });
  }
});
app.patch("/:teamid/removeplayers", async (req, res) => {
  try {
    const team = await Team.findById(req.params.teamid);
    if (!team) return res.status(404).json({ message: "Team not found" });
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    team.players = team.players.filter((player) => player !== email);
    await team.save();
    res.json(team);
  } catch (error) {
    res.status(500).json({ message: "Error removing player from team", error });
  }
});


// ---------------- START SERVER ----------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
