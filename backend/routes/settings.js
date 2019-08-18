const router = require("express").Router();
let Settings = require("../models/settings.models");
const mongoose = require("mongoose");

router.route('/').get((req, res) => {
  Settings.find({})
      .then(settings => res.json(settings))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const expense = req.body.expense;
  const categories = req.body.categories;
  const newSettings = new Settings({expense, categories});
  newSettings.save()
      .then(settings => res.json('Expense added !'))
      .catch(error => res.status(400).json('Error: '));
});

router.route('/update/:id').post((req, res) => {
  console.log("update settings");
  let id = req.params.id;
  const newId = new mongoose.Types.ObjectId(id);
  const expense = req.body.expense;
  const categories = req.body.categories;
  Settings.findOneAndUpdate({_id: newId}, {expense, categories}, {upsert:true})
      .then(settings => res.json('Settings updated !'))
      .catch(error => res.status(400).json('Error: updating settings' + error));
});

module.exports = router;