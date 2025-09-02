import express from "express";
import {
  getTeams,
  createTeam,
  updateTeam,
  deleteTeam,
  getTeamById,
  addPlayer,
  removePlayer
} from "./team.controller.js";  // ✅ same folder

const router = express.Router();

router.get("/teams", getTeams);
router.post("/teams", createTeam);
router.patch("/:teamid", updateTeam);
router.delete("/:teamid", deleteTeam);
router.get("/:teamid", getTeamById);
router.patch("/:teamid/addplayers", addPlayer);
router.patch("/:teamid/removeplayers", removePlayer);

export default router;
