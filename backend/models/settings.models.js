const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const settingsSchema = new Schema({
  expense: { type: Number },
  categories: { type: Array },
}, {
  timestamps: true
});

const Settings = mongoose.model('Settings', settingsSchema);

module.exports = Settings;