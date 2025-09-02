const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
    name: {
    type: String,
    required: true,
  },
    sport:{
    type: String,
    required: true,
  },
    agegroup: {
    type: String,
    required: true,
  },
  coachid: {
    type: Number,
    required: true,
    },
    teamtype: {
    type: String,
    required: true,
    },
    city: {
    type: String,
    required: true,
    },
    season: {
    type: String,
    required: true,
    },
    players: [{ type: String }],
});
module.exports = mongoose.model("Team", teamSchema);// models/Team.js
