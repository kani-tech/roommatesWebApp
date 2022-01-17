import React from 'react';
import {BrowserRouter, Route, Switch, Link, Redirect} from 'react-router-dom';
// Pages

const Errpage = () => {
  return (
    <div>
      <h1>Page you requested is unavailable</h1>
      <Link to="/dashboard">
        <button type="button">Click here to go home</button>
      </Link>
    </div>
  );
};

export default Errpage;
