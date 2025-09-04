const express = require("express");
const Team = require("./team.model.js");


const router = express.Router();


router.get("/teams", async (req, res) => {
    try {
        const teams = await Team.find();
        res.json(teams);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching teams", error });
    }
});

router.post("/teams", async (req, res) => {
    try {
        const { name, sport, agegroup } = req.body;
        if (!name || !sport || !agegroup)
            return res.status(400).json({ message: "All fields are required" });
        const newTeam = new Team({ name, sport, agegroup });
        await newTeam.save();
        res.json(newTeam);
    } catch (error) {
        res.status(500).json({ message: "Error creating team", error });
    }
});

router.patch("/:teamid", async (req, res) => {
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

router.delete("/:teamid", async (req, res) => {
    try {
        const deletedTeam = await Team.findByIdAndDelete(req.params.teamid);
        if (!deletedTeam) return res.status(404).json({ message: "Team not found" });
        res.json({ message: "Team deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting team", error });
    }
});

router.get("/:teamid", async (req, res) => {
    try {
        const team = await Team.findById(req.params.teamid);
        if (!team) return res.status(404).json({ message: "Team not found" });
        res.json(team);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching team", error });
    }
});

module.exports = router;
