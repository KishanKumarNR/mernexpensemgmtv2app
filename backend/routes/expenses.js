const router = require("express").Router();
let Expense = require("../models/expense.model");

router.route('/').get((req, res) => {
  Expense.find({})
      .then(expenses => res.json(expenses))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Expense.findById(req.params.id)
      .then(expense => res.json(expense))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const name = req.body.name;
  const category = req.body.category;
  const amt = req.body.amt;
  const newExpense = new Expense({name, category, amt});
  newExpense.save()
      .then(() => res.json('Expense added !'))
      .catch(error => res.status(400).json('Error: ' + err));
});

router.route("/toggle/:id").put((req, res) => {
  Expense.findById(req.params.id)
      .then(expense => {
        expense.strike = req.body.strike;
        expense.save()
            .then(() => res.json('expense toggled!'))
            .catch(err => res.status(400).json('Error : ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route("/update/:id").post((req, res) => {
  Expense.findById(req.params.id)
      .then(expense => {
        expense.name = req.body.name;
        expense.amt = Number(req.body.amt);
        expense.category = req.body.category;
        expense.date = Date.parse(req.body.date);
        expense.save()
            .then(() => res.json('expense updated!'))
            .catch(err => res.status(400).json('Error : ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;