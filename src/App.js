import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Buildings from "./components/Buildings";
import Infos from "./components/Infos";
import Error from "./components/Error";
import Navigation from "./components/Navigation";
import Kontakt from "./components/Kontakt";
import Map from "./components/Map";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navigation />
          <Switch>
            <Route path='/Kontakt' component={Kontakt} />
            <Route path='/Infos' component={Infos} />
            <Route path='/Buildings' component={Buildings} />
            <Route path='/' component={Map} />

            <Route component={Error} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
