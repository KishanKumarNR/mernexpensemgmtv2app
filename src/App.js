import React   from 'react';
import {
  BrowserRouter as Router,
  Route
}              from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import history from './history';

import Navbar       from "./components/navbar.component";
import EditExpenses from "./components/edit-expenses.component";
import Expenses     from "./components/crud-expenses.component";
import Settings     from "./components/settings.component";

import './App.css';

function App() {
  return (
      <Router history={history}>
        <div className="container">
          <Navbar/>
          <br/>
          <Route path="/" exact component={Expenses}/>
          <Route path="/edit/:id" exact component={EditExpenses}/>
          <Route path="/expenses" exact component={Expenses}/>
          <Route path="/settings" exact component={Settings}/>
        </div>
        s
      </Router>

  );
}

export default App;
