import React, { Component } from "react";

import { NavLink } from "react-router-dom";

import { reveal as Menu } from "react-burger-menu";

import { SimpleButton } from "@terrestris/react-geo";
import MobileNav from "../components/MobileNav.js";
import Unikoelnlogo from "../img/unikoenlogo.png";

class Navigation extends Component {
  state = {
    visible: true,
    buttonVisible: false
  };

  hideNavbar = () => {
    this.setState({
      visible: false
    });
  };

  showNavbar = () => {
    this.setState({
      visible: true
    });
  };

  render() {
    return (
      <div>
        <div
          id='globalnav'
          style={{ display: this.state.visible ? "block" : "none" }}
        >
          <MobileNav id='MobileNav' />

          <div id='gnavLogo'>
            <a href='Map.js'>
              Campus Map <span>Universität zu Köln</span>
            </a>
            <img id='Unikoelnlogo' src={Unikoelnlogo}></img>
          </div>

          <NavLink to='/Kontakt'>Kontakt</NavLink>
          <NavLink to='/Infos'>Infos</NavLink>
          <NavLink to='/Buildings'>Gebäudeübersicht</NavLink>
          <NavLink to='/'>Lageplan</NavLink>
          <Menu right width={"100%"}>
            <a id='home' className='menu-item' href='/'>
              Lageplan
            </a>
            <a id='about' className='menu-item' href='/about'>
              Gebäudeliste
            </a>
            <a id='contact' className='menu-item' href='/contact'>
              Infos
            </a>
            <a className='menu-item--small' href=''>
              Kontakt
            </a>
          </Menu>
        </div>
      </div>
    );
  }
}

export default Navigation;
