import React, { Component } from 'react';
import {Link} from "react-router-dom";
import axios from "axios";
import Select from "react-select";
import TextField from '@material-ui/core/Input';
import { makeStyles } from '@material-ui/core/styles';
const useStylesCall = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  dense: {
    marginTop: theme.spacing(2),
  },
  menu: {
    width: 200,
  },
}));

let useStyles = {};
const SampleFab = () => {
  useStyles = useStylesCall();
};

const Expense = props => (
    <tr>
      <td style={{
        textDecoration: props.expense.strike ? 'line-through' : 'none',
      }}>{props.expense.name}</td>
      <td style={{
        textDecoration: props.expense.strike ? 'line-through' : 'none',
      }}>{props.expense.category}</td>
      <td>
        <select
            className="form-control"
          value={props.expense.category}
          onChange={props.handleSelectOptionChange}>
          {

            props.categoryList.map(function (category) {
              return <option
                  key={category}
                  value={category}>{category}
              </option>
            })
          }
        </select>
      </td>
      <td style={{
        textDecoration: props.expense.strike ? 'line-through' : 'none',
      }}>{props.expense.amt}</td>
      <td>
        <Link to={"/edit/" + props.expense._id}>edit</Link> | <a href="#" onClick={() => {
          props.deleteExpense(props.expense._id, props.expense.strike)}}>{props.expense.strike ? "restore" : "delete"}</a>
      </td>
    </tr>
);


class ExpenseListComponent extends Component {

  constructor(props) {
    super(props);
    this.deleteExpense = this.deleteExpense.bind(this);
    this.handleNewNameChange = this.handleNewNameChange.bind(this);
    this.handleNewAmtChange = this.handleNewAmtChange.bind(this);
    this.handleNewCategoryChange = this.handleNewCategoryChange.bind(this);
    this.createNewExpense = this.createNewExpense.bind(this);
    this.clearNewExpense = this.clearNewExpense.bind(this);
    this.state = {
      newExpense: {},
      expenses: [],
      categoryList: []
    };
    this.useStyles = {};
    this.clearNewExpense();
  }

  exerciseList() {
    return this.state.expenses.map(currentexpense => {
      return <Expense categoryList={this.state.categoryList} expense={currentexpense} deleteExpense={this.deleteExpense}
                       handleSelectOptionChange={this.handleSelectOptionChange} key={currentexpense._id}/>;
    });
  }

  clearNewExpense() {
    let expenseModel = {
      name: "",
      category: "",
      amt: "",
      strike: false
    };
    this.setState({
      newExpense: expenseModel
    });
  };

  componentDidMount() {
    this.getExpense();
    this.getSettings();
  }

  handleNewNameChange(e) {
    let newExpenseItem = this.state.newExpense;
    newExpenseItem.name = e.target.value;
    this.setState({
      newExpense: newExpenseItem
    });
  };

  createNewExpense() {
    let request = this.state.newExpense;
    axios.post("http://localhost:5000/expenses/add", this.state.newExpense)
        .then()
        .catch()
        .finally(() => {
          this.clearNewExpense();
          this.getExpense();
        })
  }


  handleNewAmtChange(e) {
    let newExpenseItem = this.state.newExpense;
    newExpenseItem.amt = e.target.value;
    this.setState({
      newExpense: newExpenseItem
    });
  };

  handleNewCategoryChange(e) {
    let newExpenseItem = this.state.newExpense;
    newExpenseItem.category = e.target.value;
    this.setState({
      newExpense: newExpenseItem
    });
  };

  handleSelectOptionChange = selectedOption => {
    console.log(selectedOption, "selectedOption-selectedOption");
  };

  getExpense(forceUpdate) {
    axios.get("http://localhost:5000/expenses/")
        .then(response => {
          this.setState({expenses: response.data})
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          if (forceUpdate) { this.forceUpdate() }
        });
  }


  getSettings() {
    axios.get("http://localhost:5000/settings/")
        .then(response => {
          if (response.data.length) {
            this.setState({
              categoryList: response.data[0].categories
            });
            this.setState({settings: response.data});
            let expense = this.state.newExpense;
            expense.category = this.state.categoryList && this.state.categoryList.length && this.state.categoryList[0];
            this.setState({newExpense: expense});
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.exerciseList();
        })
  }

  deleteExpense(id, strike) {
    axios.put(`http://localhost:5000/expenses/toggle/${id}`, {
      strike: !strike
    })
        .then(res => console.log(res.data));
    this.getExpense(true);
  }

  render() {
    return (
        <div>
          <h3>Expenses</h3>
          <table className="table">
            <thead className="thead-light">
            <tr>
              <th>Item</th>
              <th>Category</th>
              <th>Select Category</th>
              <th>Amount</th>
            </tr>
            </thead>
            <tbody>
            { this.exerciseList() }
            <td><TextField
                id="outlined-name"
                label="Name"
                className={useStyles.textField}
                value={this.state.newExpense.name}
                onChange={this.handleNewNameChange}
                margin="normal"
                variant="outlined"
            /></td>
            <td>
              <div
                  id="outlined-name"
                  label="Category"
                  className={useStyles.textField}
                  value={this.state.newExpense.category}
                  margin="normal"
                  variant="outlined"
              />
            </td>
            <td>
              <select ref="userInput"
                      required
                      className="form-control"
                      value={this.state.newExpense.category}
                      onChange={this.handleNewCategoryChange}>
                {
                  this.state.categoryList.map(function (category) {
                    return <option
                        key={category}
                        value={category}>{category}
                    </option>
                  })
                }
              </select>
            </td>
            <td>
              <TextField
                  id="outlined-name"
                  label="Category"
                  className={useStyles.textField}
                  value={this.state.newExpense.amt}
                  onChange={this.handleNewAmtChange}
                  margin="normal"
                  variant="outlined"
              />
            </td>
            <td>
              <a href="#" onClick={this.createNewExpense}>add</a>
            </td>
            </tbody>
          </table>
        </div>
    );
  }
}

export default ExpenseListComponent;