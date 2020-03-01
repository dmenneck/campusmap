import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import { reveal as Menu } from "react-burger-menu";

class MobileNav extends Component {
  state = {
    visible: true
  };

  hideNavBar = () => {
    this.setState({
      visible: false
    });
  };

  showNavBar = () => {
    this.setState({
      visible: true
    });
  };
  render() {
    return (
      <div>
        <div
          id='MobileNav'
          style={{ display: this.state.visible ? "block" : "none" }}
        >
          <button onClick={this.hideNavBar} id='MobileNav'>
            -
          </button>
        </div>
        <div
          id='MobileNav'
          style={{ display: this.state.visible ? "none" : "block" }}
        >
          <button
            onClick={this.showNavBar}
            id='MobileNav'
            style={{ display: this.state.visible ? "none" : "block" }}
          >
            -
          </button>
          <div
            style={{ display: this.state.visible ? "none" : "block" }}
            id='mobileNavFullWidth'
          >
            <div id='NavBarBlocker'></div>
            <div id='MobileNavNavLinks'>
              <span>
                <NavLink to='/Kontakt' style={{ color: "white" }}>
                  Kontakt
                </NavLink>
              </span>
              <span>
                <NavLink to='/Infos' style={{ color: "white" }}>
                  Infos
                </NavLink>
              </span>
              <span>
                <NavLink to='/Buildings' style={{ color: "white" }}>
                  Gebäudeübersicht
                </NavLink>
              </span>
              <span>
                <NavLink to='/' style={{ color: "white" }}>
                  Lageplan
                </NavLink>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MobileNav;
