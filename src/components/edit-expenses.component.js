import React, { Component } from 'react';
import axios                from "axios";
import history from "../history";
import "react-datepicker/dist/react-datepicker.css";
class EditExpenseComponent extends Component {
  state ={};

  constructor(props){
    super(props);

    this.state = {
      name: "",
      amt: 0,
      category: 0,
      date: new Date(),
      categories: [],
      redirect: false
    };

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeCategories = this.onChangeCategories.bind(this);
    this.onChangeAmt = this.onChangeAmt.bind(this);
    this.onChangeDate =this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:5000/expenses/' + this.props.match.params.id)
        .then(response => {
          this.setState({
            name: response.data.name,
            amt: response.data.amt,
            category: response.data.category,
            date: new Date(response.data.date)
          })
        })
        .catch(function (error) {
          console.log(error);
        });
    axios.get("http://localhost:5000/settings/")
        .then(response => {
          if (response.data.length > 0) {
            this.setState({
              categories: response.data[0].categories
            })
          }
        })
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeCategories(e) {
    this.setState({
      category: e.target.value
    });
  }

  onChangeAmt(e) {
    this.setState({
      amt: e.target.value
    });
  }

  onChangeDate(e) {
    this.setState({
      date: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const expense = {
      name: this.state.name,
      amt: this.state.amt,
      category: this.state.category,
      date: this.state.date
    };

    axios.post("http://localhost:5000/expenses/update/" + this.props.match.params.id, expense)
        .then(data => {
          this.props.history.push('/expenses');
        })
        .catch(err => console.error(err));

  }

  render() {
    return (
        <div>
          <h3>Edit expense</h3>
          <form onSubmit={this.onSubmit}>
            <label>name: </label>
            <select ref="userInput"
                    required
                    className="form-control"
                    value={this.state.category}
                    onChange={this.onChangeCategories}>
              {
                this.state.categories.map(function (category) {
                  return <option
                      key={category}
                      value={category}>{category}
                  </option>
                })
              }
            </select>
            <div className="form-group">
              <label type="text">
                Name :
              </label>
              <input type="text"
                     className="form-control"
                     value={this.state.name}
                     onChange={this.onChangeName}
              />
            </div>
            <div className="form-group">
              <label>Amount</label>
              <input
                  type="text"
                  className="form-control"
                  value={this.state.amt}
                  onChange={this.onChangeAmt}
              />
            </div>

            <div className="form-group">
              <input type="submit" value="Update Expense" className="btn btn-primary"/>
            </div>
          </form>
        </div>
    );
  }
}

export default EditExpenseComponent;