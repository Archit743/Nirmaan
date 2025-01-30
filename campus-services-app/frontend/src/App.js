import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CanteenPage from './pages/CanteenPage';
import PrintingPage from './pages/PrintingPage';
import ParkingPage from './pages/ParkingPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/canteen" component={CanteenPage} />
        <Route path="/printing" component={PrintingPage} />
        <Route path="/parking" component={ParkingPage} />
        <Route path="/" exact>
          <h1>Welcome to Campus Services</h1>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;