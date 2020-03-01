import React, { Component } from "react";

import "ol/ol.css";
import "antd/dist/antd.css";
//import "../react-geo.css";
import OlMap from "ol/Map";
import OlView from "ol/View";
import OlVector from "ol/layer/Vector";
import OlVectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import OlLayerTile from "ol/layer/Tile";
import OlSourceOsm from "ol/source/OSM";
//import Projection from "ol/proj/Projection";
import OlStamen from "ol/source/Stamen";
import { Drawer } from "antd";
import {
  SimpleButton,
  MapComponent,
  NominatimSearch
} from "@terrestris/react-geo";

import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Accordion, Button } from "react-bootstrap";

import { NavLink } from "react-router-dom";

import uniSchriftzug from "../img/uniSchriftzug.jpg";

import buildingsData from "../campusGisBuildings.geojson";
import klinikumBuildings from "../UniklinikBuildings.geojson";
import roomData from "../Raumplan.geojson";
import { Style, Fill, Stroke } from "ol/style";
import Legende from "../components/Legende.js";

const layer = new OlLayerTile({
  source: new OlSourceOsm()
});

const stamenLayer = new OlLayerTile({
  source: new OlStamen({
    layer: "terrain"
  })
});

const center = [772305.02, 6608382.01]; //Cologne

// create a new instance of ol.map in ES6 syntax
const map = new OlMap({
  view: new OlView({
    center: center,
    zoom: 0.9,
    maxResolution: 14
  }),
  layers: [stamenLayer]
});

// adding GeoJSON to the map (buildings)
const vector = new OlVector({
  source: new OlVectorSource({
    url: buildingsData,
    format: new GeoJSON()
  }),
  style: new Style({
    fill: new Fill({
      color: "#354d60"
    })
  }),
  minResolution: 0.4
});

map.addLayer(vector);

// adding GeoJSON to the map (rooms)
const vectorTwo = new OlVector({
  source: new OlVectorSource({
    url: roomData,
    format: new GeoJSON()
  }),
  style: new Style({
    fill: new Fill({
      color: "grey"
    })
  }),
  maxResolution: 0.39999999
});

map.addLayer(vectorTwo);

// adding GeoJSON to the map (rooms)
const vectorThree = new OlVector({
  source: new OlVectorSource({
    url: klinikumBuildings,
    format: new GeoJSON()
  }),
  style: new Style({
    fill: new Fill({
      color: "red"
    })
  }),
  minResolution: 0.4
});

map.addLayer(vectorThree);

map.on("postcompose", map.updateSize);

class Ebenen extends Component {
  render() {
    return (
      <div id='ContainerEbenen'>
        <button className='EbenenBtn'>2</button>
        <button className='EbenenBtn'>1</button>
        <button className='EbenenBtn'>EG</button>
      </div>
    );
  }
}

// displays selected buildings data (not programmed yet)
class Displaydata extends Component {
  render() {
    return (
      <div id='displayData'>
        <div id='rowOne' className='rowDisplayData'>
          <p>Hausnummer</p>
          <p>Klinikum/Universität</p>
          <p>Name</p>
          <p>Straße</p>
        </div>

        {/* the clicked table rows data from Buildings.js should apear here */}
        <div id='rowTwo' className='rowDisplayData'>
          <p id='Gebäudenummer'>{}</p>
          <p id='Art'></p>
          <p id='Name'></p>
          <p id='Straße'></p>
        </div>
      </div>
    );
  }
}

// displays layer
class LegendeLayer extends Component {
  hideLayer = () => {
    vector.setVisible(false);
  };

  showLayer = () => {
    vector.setVisible(true);
  };

  hideLayerThree = () => {
    vectorThree.setVisible(false);
  };

  showLayerThree = () => {
    vectorThree.setVisible(true);
  };

  render() {
    return (
      <div>
        <div id='gridLayerLegende'>
          <button className='LayerOnOff' onClick={this.hideLayer}></button>
          <div id='blue' onClick={this.showLayer}></div>
          <div className='LayerLegendeText'>Universität</div>
          <button className='LayerOnOff' onClick={this.hideLayerThree}></button>
          <div id='red' onClick={this.showLayerThree}></div>
          <div className='LayerLegendeText'>Uniklinik</div>
        </div>
      </div>
    );
  }
}

// map class with map component, DisplayData Class, Simple Button and Drawer
class Map extends Component {
  state = { visible: false };

  toggleDrawer = () => {
    this.setState({ visible: !this.state.visible });
  };

  render() {
    return (
      <div className='App'>
        <Ebenen />
        <Legende />
        {/* DisplayData at the bottom left */}
        {/*<Displaydata />*/}
        {/* MAP */}
        <MapComponent map={map} />

        {/* Button on the left -> opens menu bar on click*/}
        <SimpleButton
          style={{ position: "absolute", top: "4.8em", left: "3em" }}
          onClick={this.toggleDrawer}
          icon='bars'
        />
        <LegendeLayer />

        {/* this is the menu bar */}
        <Drawer
          title='Menüleiste'
          placement='left'
          onClose={this.toggleDrawer}
          visible={this.state.visible}
          mask={false}
          width='60vh'
        >
          <NominatimSearch key='search' map={map} id='searchInput' />

          {/* this is the accordion within the menu bar */}
          <Accordion defaultActiveKey='0'>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant='link' eventKey='0'>
                  Filterfunktionen
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey='0'>
                <Card.Body>Hier werden Filterfunktionen angezeigt</Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
          <Accordion>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant='link' eventKey='0'>
                  Gebäudeliste
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey='0'>
                <Card.Body>
                  Klicke <NavLink to='/Buildings'>hier</NavLink>, um zu der
                  Gebäudeübersicht zu gelangen.
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
          <Accordion>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant='link' eventKey='0'>
                  Links
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey='0'>
                <Card.Body>
                  <ul>
                    <li>
                      <NavLink to='/Buildings' target='_blank'>
                        Gebäudeliste
                      </NavLink>
                    </li>
                    <li>Lagepläne der Uniklinik</li>
                    <li>Parken an der Universität</li>
                    <li>Liniennetzplan der KVB</li>
                    <li>Öffnungszeiten zentrale Gebäude</li>
                  </ul>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
          <Accordion>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant='link' eventKey='0'>
                  Folge der Universität zu Köln!
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey='0'>
                <Card.Body>
                  <a
                    href='https://www.facebook.com/universitaetkoeln/'
                    target='_blank'
                    className='fa fa-facebook'
                    id='socialMediaBtn'
                  ></a>
                  <a
                    href='https://www.instagram.com/uni_koeln/?hl=de'
                    target='_blank'
                    className='fa fa-instagram'
                    id='socialMediaBtn'
                  ></a>
                  <a
                    href='https://www.youtube.com/user/UniversitaetzuKoeln'
                    target='_blank'
                    className='fa fa-youtube'
                    id='socialMediaBtn'
                  ></a>
                  <ul>
                    <li>
                      <a
                        href='https://www.uni-koeln.de/'
                        target='_blank'
                        id='uniKoelnLink'
                      >
                        Universität zu Köln
                      </a>
                    </li>
                    <li>
                      <a
                        href='https://www.geographie.uni-koeln.de/'
                        target='_blank'
                        id='uniKoelnLink'
                      >
                        Geographisches Institut
                      </a>
                    </li>
                  </ul>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <img src={uniSchriftzug} alt='logo' id='logoSchriftzug' />
        </Drawer>
      </div>
    );
  }
}

export default Map;
