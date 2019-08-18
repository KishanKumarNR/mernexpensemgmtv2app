import React, { Component } from "react";
import {Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Expense Manager</Link>
        <div className="collapse navbar-collapse">
          <ul className="collapse navbar-collapse">
            <li className="navbar-item">
              <Link to="/expenses" className="nav-link">Expenses</Link>
            </li>
            <li className="navbar-item">
              <Link to="/settings" className="nav-link">Settings</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}