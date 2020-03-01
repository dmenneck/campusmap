import React, { Component } from "react";

import testdata from "../testdata.json";
import { AgFeatureGrid } from "@terrestris/react-geo";
import OlFormatGeoJSON from "ol/format/GeoJSON";

const format = new OlFormatGeoJSON();
const features = format.readFeatures(testdata);

class Buildings extends Component {
  render() {
    //Whenever our class runs, render method will be called automatically, it may have already defined in the constructor behind the scene.
    return (
      <div>
        <h2 className='überschrift'>Gebäudeübersicht</h2>
        <h3 className='description'>
          Klicken Sie auf die gewünschte Zeile, um das ausgewählte Gebäude auf
          dem Lapeplan anzuzeigen
        </h3>

        <div id='container-table'>
          <AgFeatureGrid features={features} map={this.map} />
        </div>
      </div>
    );
  }
}

export default Buildings;
