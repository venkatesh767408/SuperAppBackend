const User = require("./user.model");

// Create new user
/*exports.createUser = async (req, res) => {
  try {
    const { name, email, globalRole } = req.body;

    if (!name || !email) {
      return res.status(400).json({ success: false, message: "Name and Email are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const user = await User.create({ name, email, globalRole });
    return res.status(201).json({ success: true, data: user });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};
*/

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get single user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Subscribe user to a team
exports.subscribeToTeam = async (req, res) => {
  try {
    const { teamId } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    if (!user.subscribedTeams.includes(teamId)) {
      user.subscribedTeams.push(teamId);
    }

    await user.save();
    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error("Error subscribing to team:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Assign contextual role (Coach/Player) in a team
exports.assignTeamRole = async (req, res) => {
  try {
    const { teamId, role } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    // Check if already assigned
    const existingRole = user.teams.find(t => t.teamId.toString() === teamId);
    if (existingRole) {
      existingRole.role = role; // update role
    } else {
      user.teams.push({ teamId, role });
    }

    await user.save();
    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error("Error assigning role:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    return res.status(200).json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};
