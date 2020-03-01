import React, { Component } from "react";
import logo from "../img/kölnMap.png";

import { NavLink } from "react-router-dom";
// Some informations about the project and the university of cologne
class Infos extends Component {
  render() {
    return (
      <div className='container' id='infoContainer'>
        <h2 className='überschrift'>Lageplan der Universität zu Köln</h2>
        <div className='row'>
          <div className='one-half column relative' id='gridHalf'>
            <span className='absolute'>
              Finden Sie jedes Gebäude der Universität und Uniklinik Köln.
              <br></br>
              <button id='infoLageplanBtn'>
                <NavLink to='/Buildings'>Klick hier</NavLink>
              </button>
            </span>
          </div>

          <div className='one-half column' id='gridHalf'>
            <img src={logo} alt='logo' id='cgnMap' />
          </div>
        </div>

        <h2 className='überschrift geoHeading'>
          Ein Projekt des geographischen Instituts
        </h2>
        <div id='geoText'>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
          rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
          ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
          sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
          dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
          et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
          takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
          amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
          invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
          At vero eos et accusam et justo duo dolores et ea rebum. Stet clita
          kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
          amet.
        </div>
      </div>
    );
  }
}

export default Infos;
