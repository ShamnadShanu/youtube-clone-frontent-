import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import User from "./Router/User";
import Admin from "./Router/Admin";

function App() {
  return (
    <div>
      <Router>
        <Route path="/" component={User}></Route>
        <Route  path="/admin" component={Admin}></Route>
      </Router>
    </div>
  );
}

export default App;
