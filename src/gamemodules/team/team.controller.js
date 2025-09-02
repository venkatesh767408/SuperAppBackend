import Team from "./team.model.js";

// Get all teams
export const getTeams = async (req, res) => {
  try {
    const teams = await Team.find();
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: "Error fetching teams", error });
  }
};

// Create team
export const createTeam = async (req, res) => {
  try {
    const { name, sport, agegroup, coachid, teamtype, city, season } = req.body;
    if (!name || !sport || !agegroup || !coachid || !teamtype || !city || !season) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newTeam = new Team({ name, sport, agegroup, coachid, teamtype, city, season });
    await newTeam.save();
    res.json("New team created successfully");
  } catch (error) {
    res.status(500).json({ message: "Error creating team", error });
  }
};

// Update team
export const updateTeam = async (req, res) => {
  try {
    const updatedTeam = await Team.findByIdAndUpdate(
      req.params.teamid,
      req.body,
      { new: true }
    );
    if (!updatedTeam) return res.status(404).json({ message: "Team not found" });
    res.json(updatedTeam);
  } catch (error) {
    res.status(500).json({ message: "Error updating team", error });
  }
};

// Delete team
export const deleteTeam = async (req, res) => {
  try {
    const deletedTeam = await Team.findByIdAndDelete(req.params.teamid);
    if (!deletedTeam) return res.status(404).json({ message: "Team not found" });
    res.json({ message: "Team deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting team", error });
  }
};

// Get team by ID
export const getTeamById = async (req, res) => {
  try {
    const team = await Team.findById(req.params.teamid);
    if (!team) return res.status(404).json({ message: "Team not found" });
    res.json(team);
  } catch (error) {
    res.status(500).json({ message: "Error fetching team", error });
  }
};

// Add player
export const addPlayer = async (req, res) => {
  try {
    const team = await Team.findById(req.params.teamid);
    if (!team) return res.status(404).json({ message: "Team not found" });

    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    if (!team.players.includes(email)) {
      team.players.push(email);
    }

    await team.save();
    res.json(team);
  } catch (error) {
    res.status(500).json({ message: "Error adding player to team", error });
  }
};

// Remove player
export const removePlayer = async (req, res) => {
  try {
    const team = await Team.findById(req.params.teamid);
    if (!team) return res.status(404).json({ message: "Team not found" });

    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    team.players = team.players.filter((player) => player !== email);

    await team.save();
    res.json(team);
  } catch (error) {
    res.status(500).json({ message: "Error removing player from team", error });
  }
};
