import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as PropTypes from "prop-types";
import "ol/ol.css";
import "antd/dist/antd.css";
//import "../react-geo.css";
import OlMap from "ol/Map";
import OlView from "ol/View";
import OlVector from "ol/layer/Vector";
import OlVectorSource from "ol/source/Vector";
import OlStyleIcon from "ol/style/Icon";
import OlStyleStroke from "ol/style/Stroke";
import OlStyle from "ol/style/Style";
import GeoJSON from "ol/format/GeoJSON";
import OlLayerTile from "ol/layer/Tile";
import OlSourceOsm from "ol/source/OSM";
import OlSourceStamen from "ol/source/Stamen";
//import Projection from "ol/proj/Projection";
import OlStamen from "ol/source/Stamen";
import OlLayerGroup from "ol/layer/Group";
import OlSourceTileWMS from "ol/source/TileWMS";
import TileJSON from "ol/source/TileJSON";
import XYZ from "ol/source/XYZ";
import KML from "ol/format/KML";

import { Drawer, Icon } from "antd";
import {
  SimpleButton,
  MapComponent,
  AgFeatureGrid,
  ZoomToExtentButton,
  GeoLocationButton,
  LayerTransparencySlider,
  ToggleGroup,
  ToggleButton,
  NominatimSearch,
  Window,
  MeasureButton,
  LayerTree,
  LayerSwitcher
} from "@terrestris/react-geo";

import TextField from "@material-ui/core/TextField";

import OlFormatGeoJSON from "ol/format/GeoJSON";
import Select from "ol/interaction/Select";
import { ZoomSlider } from "ol/control";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import View from "ol/View";
import { defaults as defaultControls, FullScreen } from "ol/control";
import { fromLonLat } from "ol/proj";

import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Accordion, Button } from "react-bootstrap";

import { NavLink } from "react-router-dom";

import uniSchriftzug from "../img/uniSchriftzug.jpg";
import getlocation from "../img/getlocation.png";
import haus from "../img/haus.jpg";
import search from "../img/search.png";
import toilets from "../img/unisex.png";
import ruler from "../img/ruler.png";
import layerpng from "../img/layer.png";

import buildingsData from "../Data/buildingsUniversity.geojson";

import toiletsPoints from "../toilets.geojson";
import testdata from "../testdata.json";

import RundbauGrundriss from "../RundbauGrundriss.geojson";
import EtageEinsRäume from "../EtageEinsRäume.geojson";
import EtageZweiRäume from "../EtageZweiRäume.geojson";
import EtageEinsGang from "../EtageEinsGang.geojson";

import { Style, Fill, Stroke } from "ol/style";

const layersGroup = new OlLayerGroup({
  name: "Layergroup",
  layers: [
    new OlLayerTile({
      name: "OSM",
      visible: false,
      source: new OlSourceStamen({
        layer: "terrain"
      })
    }),
    new OlLayerTile({
      // Format: JPEG - https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer
      name: "Satellite",
      minResolution: 0,
      maxResolution: 10,
      visible: false,
      source: new XYZ({
        attributions: [
          "Powered by Esri",
          "Source: Esri, DigitalGlobe, GeoEye, Earthstar Geographics, CNES/Airbus DS, USDA, USGS, AeroGRID, IGN, and the GIS User Community"
        ],
        attributionsCollapsible: false,
        url:
          "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        maxZoom: 23
      })
    }),
    new OlLayerTile({
      // Format: JPEG - https://services.arcgisonline.com/arcgis/rest/services/USA_Topo_Maps/MapServer
      name: "Esri",
      source: new XYZ({
        attributions:
          'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/' +
          'rest/services/World_Topo_Map/MapServer">ArcGIS</a>',
        url:
          "https://server.arcgisonline.com/ArcGIS/rest/services/" +
          "World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
      })
    })
  ]
});

const center = [771105.02, 6608382.01]; //Cologne

// create a new instance of ol.map in ES6 syntax
const map = new OlMap({
  controls: defaultControls().extend([new FullScreen()]),
  view: new OlView({
    center: center,
    zoom: 0.9,
    maxResolution: 7
  }),
  layers: [layersGroup]
});

var zoomslider = new ZoomSlider();
map.addControl(zoomslider);

// adding GeoJSON to the map (buildings)
const vector = new OlVector({
  source: new OlVectorSource({
    url: buildingsData,
    format: new GeoJSON()
  }),
  style: new Style({
    //stroke: new Stroke({
    //color: "black",
    //width: 0.2
    // }),
    fill: new Fill({
      color: "grey"
    })
  }),
  minResolution: 0.4
});

map.addLayer(vector);

// adding GeoJSON to the map (rooms)
const vectorTwo = new OlVector({
  source: new OlVectorSource({
    url: RundbauGrundriss,
    format: new GeoJSON()
  }),
  style: new Style({
    fill: new Fill({
      color: "grey"
    }),
    stroke: new Stroke({
      color: "black",
      width: 1.2
    })
  }),
  maxResolution: 0.39999999
});

map.addLayer(vectorTwo);

// adding GeoJSON to the map (Gang)
const GangRundbau = new OlVector({
  source: new OlVectorSource({
    url: EtageEinsGang,
    format: new GeoJSON()
  }),
  style: new Style({
    fill: new Fill({
      color: "grey"
    }),
    stroke: new Stroke({
      color: "red",
      width: 5
    })
  }),
  maxResolution: 0.39999999
});

map.addLayer(GangRundbau);

// adding GeoJSON to the map (rooms)
const vectorThree = new OlVector({
  source: new OlVectorSource({
    //url: klinikumBuildings,
    format: new GeoJSON()
  }),
  style: new Style({
    fill: new Fill({
      color: "#5493C4"
    }),
    stroke: new Stroke({
      color: "black",
      width: 1.2
    })
  }),
  minResolution: 0.4
});

//map.addLayer(vectorThree);

// adding GeoJSON to the map (EtageEinsRäume)
const EtageEinsRäumeLayer = new OlVector({
  source: new OlVectorSource({
    url: EtageEinsRäume,
    format: new GeoJSON()
  }),
  style: new Style({
    fill: new Fill({
      color: "blue"
    }),
    stroke: new Stroke({
      color: "black",
      width: 1.2
    })
  }),
  maxResolution: 0.39999999
});

map.addLayer(EtageEinsRäumeLayer);

// adding GeoJSON to the map (EtageZweiRäume)
const EtageZweiRäumeLayer = new OlVector({
  source: new OlVectorSource({
    url: EtageZweiRäume,
    format: new GeoJSON()
  }),
  style: new Style({
    fill: new Fill({
      color: "blue"
    }),
    stroke: new Stroke({
      color: "black",
      width: 5
    })
  }),
  maxResolution: 0.39999999
});

map.addLayer(EtageZweiRäumeLayer);

// adding GeoJSON to the map (toilets)
const toiletsPointsLayer = new OlVector({
  source: new OlVectorSource({
    url: toiletsPoints,
    format: new GeoJSON()
  }),
  style: new OlStyle({
    image: new OlStyleIcon({
      src: toilets
    })
  })
});

map.addLayer(toiletsPointsLayer);

map.on("postcompose", map.updateSize);

class Ebenen extends Component {
  state = {
    show: true,
    showTwo: true,
    color: false
  };

  hideLayer = () => {
    EtageEinsRäumeLayer.setVisible(false);
  };

  showLayer = () => {
    EtageEinsRäumeLayer.setVisible(true);
  };

  hideLayerTwo = () => {
    EtageZweiRäumeLayer.setVisible(false);
  };

  showLayerTwo = () => {
    EtageZweiRäumeLayer.setVisible(true);
  };

  toggle = () => this.setState(currentState => ({ show: !currentState.show }));

  toggleTwo = () =>
    this.setState(currentState => ({ showTwo: !currentState.showTwo }));

  render() {
    return (
      <div id='ContainerEbenen'>
        <button className='EbenenBtn' onClick={this.toggleTwo}>
          {this.state.showTwo ? this.hideLayerTwo() : this.showLayerTwo()}Etage
          2
        </button>

        <button className='EbenenBtn' id='button' onClick={this.toggle}>
          {this.state.show ? this.hideLayer() : this.showLayer()} Etage 1
        </button>
      </div>
    );
  }
}

class Displaydata extends Component {
  render() {
    return (
      <div id='displayData'>
        <div id='rowOne' className='rowDisplayData'>
          <p>Gebäudenummer</p>
          <p>Name</p>
          <p>Klinikum/Universität</p>
          <p>Straße</p>
        </div>

        <div id='rowTwo' className='rowDisplayData'>
          <p id='Gebäudenummer'></p>
          <p id='Name'></p>
          <p id='Art'></p>
          <p id='Straße'></p>
        </div>
      </div>
    );
  }
}

export class SearchForm extends Component {
  render() {
    return (
      <div>
        <div id='SearchForm'>
          <form noValidate autoComplete='off'>
            <TextField
              id='outlined-basic'
              label='Outlined'
              variant='outlined'
            />
            <Button></Button>
          </form>
        </div>
      </div>
    );
  }
}

// when the user moves the mouse, get the name property
// from each feature under the mouse and display it in <DisplayData />
function onMouseMove(browserEvent) {
  var coordinate = browserEvent.coordinate;
  var pixel = map.getPixelFromCoordinate(coordinate);
  var el = document.getElementById("Gebäudenummer");
  el.innerHTML = "";
  map.forEachFeatureAtPixel(pixel, function(feature) {
    el.innerHTML += feature.get("GEBNR") + "<br>";
  });

  var el = document.getElementById("Name");
  el.innerHTML = "";
  map.forEachFeatureAtPixel(pixel, function(feature) {
    el.innerHTML += feature.get("NAME") + "<br>";
  });

  var el = document.getElementById("Straße");
  el.innerHTML = "";
  map.forEachFeatureAtPixel(pixel, function(feature) {
    el.innerHTML += feature.get("Straße") + "<br>";
  });

  var el = document.getElementById("Art");
  el.innerHTML = "";
  map.forEachFeatureAtPixel(pixel, function(feature) {
    el.innerHTML += feature.get("Klinikum/Universität") + "<br>";
  });
}
map.on("click", onMouseMove);

// AgFeatureGrid
const format = new OlFormatGeoJSON();
const features = format.readFeatures(testdata);

// An array of numbers representing an extent: [minx, miny, maxx, maxy].
const extent1 = [408948, 6484461, 1253685, 6629060];

const featureStyle = new OlVector({
  style: new Style({
    fill: new Fill({
      color: "#354d60"
    })
  })
});
// map class with map component, DisplayData Class, Simple Button and Drawer
class Map extends Component {
  state = { visible: false, show: false, showTwo: false, showThree: false };

  toggleDrawer = () => {
    this.setState({ visible: !this.state.visible });
  };

  hideLayer = () => {
    vector.setVisible(false);
  };

  showLayer = () => {
    vector.setVisible(true);
  };

  hideLayerTwo = () => {
    vectorThree.setVisible(false);
  };

  showLayerTwo = () => {
    vectorThree.setVisible(true);
  };

  toggle = () => this.setState(currentState => ({ show: !currentState.show }));

  toggleTwo = () =>
    this.setState(currentState => ({ showTwo: !currentState.showTwo }));

  toggleThree = () =>
    this.setState(currentState => ({ showThree: !currentState.showThree }));

  render() {
    return (
      <div className='App'>
        {this.state.showThree ? (
          <div className='form'>
            <input type='text' name='name' autoComplete='off' required></input>
            <label for='name' className='label-name'>
              <span className='content-name'>Search</span>
            </label>
          </div>
        ) : null}

        <Accordion>
          <Card id='LegendeLayerAccordion'>
            <Card.Header id='LegendeLayerHeader'>
              <Accordion.Toggle as={Button} variant='link' eventKey='0'>
                <img id='layerpng' src={layerpng}></img>
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey='0'>
              <Card.Body>
                <div id='containerHintergrund'>
                  <span className='underline'>Hintergrund Karte</span>
                  <br></br>
                  <LayerTree map={map} layerGroup={layersGroup} />
                </div>
                <div id='controlFunctions'>
                  <span className='underline'>
                    Abfrage- und Kontrollfuntionen
                  </span>
                  <br></br>

                  <button id='measureBtnInDrawer'>
                    <MeasureButton
                      id='measureBtnReactGeo'
                      name='multi'
                      map={map}
                      measureType='line'
                      multipleDrawing
                    >
                      <img src={ruler} id='ruler'></img>
                    </MeasureButton>
                  </button>

                  <button id='toggleSearchBar' onClick={this.toggleThree}>
                    <img src={search} id='ruler'></img>
                  </button>
                </div>
                <div id='containerEbenen'>
                  <span className='underline'>Etagen</span>
                  <Ebenen />
                </div>
                <div id='containerLayer'>
                  <span className='underline'>Layer</span>
                  <div id='containerLayerGrid'>
                    <SimpleButton
                      onClick={this.toggle}
                      className='layerVisibilityBtn'
                    >
                      {this.state.showTwo
                        ? this.hideLayerTwo()
                        : this.showLayerTwo()}
                    </SimpleButton>
                    <div id='blue'></div>
                    <div className='LayerLegendeText'>Universität</div>
                  </div>
                  <LayerTransparencySlider
                    layer={vector}
                    className='transparencyVector'
                  />
                </div>

                <div id='containerLayer'>
                  <div id='containerLayerGrid'>
                    <SimpleButton
                      onClick={this.toggleTwo}
                      className='layerVisibilityBtn'
                    >
                      {this.state.show ? this.hideLayer() : this.showLayer()}
                    </SimpleButton>
                    <div id='red'></div>
                    <div className='LayerLegendeText'>Uniklinik</div>
                    <LayerTransparencySlider
                      layer={vectorThree}
                      className='transparencyVector'
                    />
                  </div>
                </div>
                <div id='containerLayerPoints'>
                  <div id='containerLayerPointsGrid'>
                    <div class='pointsGridRow'>
                      <div className='pointsGridCol'>
                        <img src={toilets}></img>
                      </div>
                      <div className='pointsGridCol'>Unisex Wcs</div>
                    </div>
                    <div class='pointsGridRow'>
                      <div className='pointsGridCol'>
                        <img src={toilets}></img>
                      </div>
                      <div className='pointsGridCol'>Name</div>
                    </div>
                    <div class='pointsGridRow'>
                      <div className='pointsGridCol'>
                        <img src={toilets}></img>
                      </div>
                      <div className='pointsGridCol'>Unisex Wcs</div>
                    </div>
                    <div class='pointsGridRow'>
                      <div className='pointsGridCol'>
                        <img src={toilets}></img>
                      </div>
                      <div className='pointsGridCol'>Unisex Wcs</div>
                    </div>
                    <div class='pointsGridRow'>
                      <div className='pointsGridCol'>
                        <img src={toilets}></img>
                      </div>
                      <div className='pointsGridCol'>Unisex Wcs</div>
                    </div>
                    <div class='pointsGridRow'>
                      <div className='pointsGridCol'>
                        <img src={toilets}></img>
                      </div>
                      <div className='pointsGridCol'>Unisex Wcs</div>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>

        <div id='options'>
          <SimpleButton onClick={this.toggleDrawer} icon='bars' id='menuBtn' />
          <ZoomToExtentButton
            id='zoomToExtBtn'
            map={map}
            extent={extent1}
            fitOptions={{
              duration: 3000,
              maxZoom: 10
            }}
          >
            <img
              src={haus}
              alt='full extend'
              style={{ width: "30px", heigth: "auto" }}
            ></img>
          </ZoomToExtentButton>

          <GeoLocationButton
            onGeolocationChange={() => undefined}
            map={map}
            showMarker={true}
            follow={true}
            id='getlocationbtn'
          >
            <img
              src={getlocation}
              alt='get Location'
              style={{ width: "30px", heigth: "auto" }}
            ></img>
          </GeoLocationButton>
        </div>

        {/* DisplayData at the bottom left */}
        <Displaydata />

        {/* MAP */}
        <MapComponent map={map} />
        {/* Button on the left -> opens menu bar on click*/}

        {/* this is the menu bar */}
        <Drawer
          title='Menüleiste'
          placement='left'
          onClose={this.toggleDrawer}
          visible={this.state.visible}
          mask={true}
          width='480px'
          id='Drawer'
        >
          {/* this is the accordion within the menu bar */}
          <Accordion>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant='link' eventKey='0'>
                  Gebäudeliste
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey='0'>
                <Card.Body>
                  <AgFeatureGrid
                    features={features}
                    map={map}
                    columnDefs={{
                      G_NR: {
                        headerName: "Gebäudenr.",
                        sortable: true,
                        filter: true,
                        resiable: true
                      },
                      NAME: {
                        headerName: "Name",
                        sortable: true,
                        filter: true,
                        resiable: true
                      },
                      Straße: {
                        headerName: "Straße",
                        sortable: true,
                        filter: true,
                        resiable: true
                      }
                    }}
                    attributeBlacklist={[
                      "OBJECTID",
                      "GEBNR",
                      "XCoord",
                      "YCoord",
                      "Z2",
                      "Klinikum/Universität"
                    ]}
                    height='400px'
                    featureStyle={
                      new OlStyle({
                        fill: new Fill({
                          color: "rgba(0,0,0,0)"
                        })
                      })
                    }
                    zoomToExtent={true}
                  />
                  <span>
                    Klicke <NavLink to='/Buildings'>hier</NavLink>, um zu der
                    ausführlichen Gebäudeübersicht zu gelangen.
                  </span>
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
                      <NavLink
                        to='/Buildings'
                        target='_blank'
                        id='gebauelisteLink'
                      >
                        Gebäudeliste
                      </NavLink>
                    </li>
                    <li>
                      <a
                        href='http://www.uni-koeln.de/uni/gebaeude/liste.html'
                        target='_blank'
                        id='gebauelisteLink'
                      >
                        Lagepläne der Uniklinik
                      </a>
                    </li>
                    <li>
                      <a
                        href='https://verwaltung.uni-koeln.de/abteilung54/content/sachgebiet_4/parkraumbewirtschaftung/index_ger.html'
                        target='_blank'
                        id='gebauelisteLink'
                      >
                        Parken an der Uni
                      </a>
                    </li>
                    <li>
                      <a
                        href='https://www.kvb.koeln/'
                        target='_blank'
                        id='gebauelisteLink'
                      >
                        Liniennetzplan der KVB
                      </a>
                    </li>
                    <li>
                      <a
                        href='http://www.portal.uni-koeln.de/oeffnungszeiten_adr.html#c36618'
                        target='_blank'
                        id='gebauelisteLink'
                      >
                        Öffnungszeiten zentrale Gebäude
                      </a>
                    </li>
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
                        id='geoInstitutLink'
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
