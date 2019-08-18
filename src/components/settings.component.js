import React, { Component } from 'react';
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class SettingsComponent extends Component {
  state ={};

  constructor(props){
    super(props);

    this.state = {
      settings: [],
      expense: "",
      categories: []
    };

    this.onChangeExpense= this.onChangeExpense.bind(this);
    this.onChangeCategory= this.onChangeCategory.bind(this);
    this.onUpdateCategory= this.onUpdateCategory.bind(this);
    this.onChangeDate =this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:5000/settings/')
        .then(response => {
          this.setState({
            settings: response.data
          })
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => {
          if (this.state.settings.length) {
            let settings = this.state.settings[0];
            this.setState({
              expense: settings.expense,
              categories: settings.categories
            })
          }
        });
  }

  onChangeExpense(e) {
    this.setState({
      expense: e.target.value
    });
  }

  onChangeCategory(e) {
    this.setState({
      category: e.target.value
    });
  }

  updateSettings() {
    axios.post(`http://localhost:5000/settings/update/${this.state.settings[0]._id}`, {
      expense: this.state.expense,
      categories: this.state.categories
    })
        .then(data => {
          this.componentDidMount();
        })
        .catch(err => console.log(err));
  }

  createSettings() {
    axios.post(`http://localhost:5000/settings/add/`, {
      expense: this.state.expense,
      categories: this.state.categories
    })
        .then(data => {
          this.componentDidMount();
        })
        .catch(err => console.log(err));
  }


  onUpdateCategory(e) {
    let categories = this.state.categories;
    if (this.state.category) categories.push(this.state.category);
    this.setState({categories: categories});
    if (this.state.settings.length) {
     this.updateSettings();
    } else {
      this.createSettings();
    }
  }

  onChangeDate(e) {
    this.setState({
      date: new Date()
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const expense = {
      expense: this.state.expense,
      categories: this.state.categories,
      date: new Date()
    };
    this.onUpdateCategory();
  }

  render() {
    return (
        <div>
          <h3>settings</h3>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label type="text">
                Expenses :
              </label>
              <input type="text"
                     className="form-control"
                     value={this.state.expense}
                     onChange={this.onChangeExpense}
              />
            </div>
            <div className="form-group">
              <label>Categories : </label>
              <select ref="userInput"
                      className="form-control"
                      value={this.state.category}
                      // onChange={this.onChangeCategory}
              >
                {
                  this.state.categories.map(function (category) {
                    return <option
                        key={category}
                        value={category}>{category}
                    </option>
                  })
                }
              </select>
            </div>
            <div className="form-group">
              <label type="text">
                Add Category :
              </label>
              <div className="form-group row">
              <input type="text"
                     className="form-control col-sm-6"
                     value={this.state.category}
                     onChange={this.onChangeCategory}
              />
              <button type="button" className="btn btn-primary col-md-2" onClick={this.onUpdateCategory} aria-label="Add">
                Add
              </button>
              </div>
            </div>


            <div className="form-group">
              <input type="submit" value="Update Expense settings" className="btn btn-primary"/>
            </div>
          </form>
        </div>
    );
  }
}

export default SettingsComponent;