import 'ol/ol.css';
import Map from 'ol/map';
import View from 'ol/view';
import TileLayer from 'ol/layer/tile';
import Style from 'ol/style/style';
import Stroke from 'ol/style/stroke';
import Fill from 'ol/style/fill';
import XYZ from 'ol/source/xyz';
import proj from 'ol/proj'; //is this the right way to pull this in? Or should it just be a single class?
import Attribution from 'ol/';
import MVT from 'ol/format/mvt';
import GeoJSONT from 'ol/format/geojson'
import VectorL from 'ol/layer/vector'
import VectorS from 'ol/source/vector'
import VectorTileLayer from 'ol/layer/vectortile';
import VectorTileSource from 'ol/source/vectortile';
import sync from 'ol-hashed';
import hashed from 'hashed';
import { getJSON } from 'jquery';
import validUrl from 'valid-url';



var mapboxAPIK = 'pk.eyJ1IjoiZGF2aWRsaW5kZW5iYXVtIiwiYSI6ImNqaDU3OW9nMjB2M2Yyd28ydW1lNGxuOGEifQ.erGt8qc8r4DenEnSpqf4hg'
var spacenetURL_Vegas = "s3://spacenet-dataset/AOI_2_Vegas/srcData/rasterData/AOI_2_Vegas_MUL-PanSharpen_Cloud.tif"
var spacenetURL_Paris = "s3://spacenet-dataset/AOI_3_Paris/srcData/rasterData/AOI_3_Paris_MUL-PanSharpen_Cloud.tif"
var spacenetURL_Shanghai = "s3://spacenet-dataset/AOI_4_Shanghai/srcData/rasterData/AOI_4_Shanghai_MUL-PanSharpen_Cloud.tif"
var spacenetURL_Khartoum = "s3://spacenet-dataset/AOI_5_Khartoum/srcData/rasterData/AOI_5_Khartoum_MUL-PanSharpen_Cloud.tif"
var spacenetURL = spacenetURL_Vegas
var labels = new TileLayer({
  title: 'Labels',
  source: new XYZ({

    url: 'https://{1-4}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}.png',
    attributions: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>, ' + 
         '© <a href="https://carto.com/attribution">CARTO</a>',
  })
});

var highlightStyle = new Style({
        stroke: new Stroke({
          color: '#FF0000',
          width: 1
        }),
        fill: new Fill({
          color: 'rgba(255,0,0,0.1)'
        })
      });

var highlightStyle1 = new Style({
        stroke: new Stroke({
          color: '#0000ff',
          width: 1
        }),
        fill: new Fill({
          color: 'rgba(255,0,0,0.1)'
        })
      });

var roadlightStyle = new Style({
        stroke: new Stroke({
          color: '#00ff00',
          width: 2
        }),
        fill: new Fill({
          color: 'rgba(0,255,0,0.3)'
        })
      });

/*
var footPrintLayer = new TileLayer({
  title: 'footPrintLayer',
  source: new XYZ({

    url: 'http://fileservercw01.labs.internal:8095/_/{z}/{x}/{y}@2x.png',
    attributions: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>, ' +
         '© <a href="https://carto.com/attribution">CARTO</a>',
  })
});
*/


var footPrintLayer = new VectorTileLayer({
  style: highlightStyle,
  source: new VectorTileSource({
    attributions: [
      '<a href="http://www.openmaptiles.org/" target="_blank">&copy; OpenMapTiles</a>',
      '<a href="http://www.openstreetmap.org/about/" target="_blank">&copy; OpenStreetMap contributors</a>'
    ],
    format: new MVT(),
    url: 'https://api.mapbox.com/v4/davidlindenbaum.6chimvgs/{z}/{x}/{y}.vector.pbf?access_token=' + mapboxAPIK, //"http://fileservercw01.labs.internal:8095/{z}/{x}/{y}.pbf",
    maxZoom: 17,
  })
});

footPrintLayer.changed()

var footPrintLayer_Vegas = new VectorTileLayer({
  style: highlightStyle1,
  source: new VectorTileSource({
    attributions: [
      '<a href="http://www.openmaptiles.org/" target="_blank">&copy; OpenMapTiles</a>',
      '<a href="http://www.openstreetmap.org/about/" target="_blank">&copy; OpenStreetMap contributors</a>'
    ],
    format: new MVT(),
    url: 'https://api.mapbox.com/v4/davidlindenbaum.3tkv29lu/{z}/{x}/{y}.vector.pbf?access_token=' + mapboxAPIK, //"http://fileservercw01.labs.internal:8095/{z}/{x}/{y}.pbf",
    maxZoom: 17,
  })
});

footPrintLayer_Vegas.changed()

var footPrintLayer_Shanghai = new VectorTileLayer({
  style: highlightStyle1,
  source: new VectorTileSource({
    attributions: [
      '<a href="http://www.openmaptiles.org/" target="_blank">&copy; OpenMapTiles</a>',
      '<a href="http://www.openstreetmap.org/about/" target="_blank">&copy; OpenStreetMap contributors</a>'
    ],
    format: new MVT(),
    url: 'https://api.mapbox.com/v4/davidlindenbaum.0fpmkh2y/{z}/{x}/{y}.vector.pbf?access_token=' + mapboxAPIK, //"http://fileservercw01.labs.internal:8095/{z}/{x}/{y}.pbf",
    maxZoom: 17,
  })
});

footPrintLayer_Shanghai.changed()

var footPrintLayer_Khartoum = new VectorTileLayer({
  style: highlightStyle1,
  source: new VectorTileSource({
    attributions: [
      '<a href="http://www.openmaptiles.org/" target="_blank">&copy; OpenMapTiles</a>',
      '<a href="http://www.openstreetmap.org/about/" target="_blank">&copy; OpenStreetMap contributors</a>'
    ],
    format: new MVT(),
    url: 'https://api.mapbox.com/v4/davidlindenbaum.7ktu2nqz/{z}/{x}/{y}.vector.pbf?access_token=' + mapboxAPIK, //"http://fileservercw01.labs.internal:8095/{z}/{x}/{y}.pbf",
    maxZoom: 17,
  })
});

footPrintLayer_Khartoum.changed()



var aoiLayer = new VectorL({
            source: new VectorS({
                format: new GeoJSONT(),
                url: 'https://raw.githubusercontent.com/SpaceNetChallenge/utilities/spacenetV3/spacenetutilities/datasets/SpaceNetSummaryTindex.geojson'
            })

        });





var footPrintLayerT = new VectorTileLayer({
  source: new VectorTileSource({
    attributions: [
      '<a href="http://www.openmaptiles.org/" target="_blank">&copy; OpenMapTiles</a>',
      '<a href="http://www.openstreetmap.org/about/" target="_blank">&copy; OpenStreetMap contributors</a>'
    ],
    format: new MVT(),
    url: "http://fileservercw01.labs.internal:8096/{z}/{x}/{y}.pbf",
    maxZoom: 17


  })
});

var roadLayer = new VectorTileLayer({
  style: roadlightStyle,
  source: new VectorTileSource({
    attributions: [
      '<a href="http://www.openmaptiles.org/" target="_blank">&copy; OpenMapTiles</a>',
      '<a href="http://www.openstreetmap.org/about/" target="_blank">&copy; OpenStreetMap contributors</a>'
    ],
    format: new MVT(),
    url: 'https://api.mapbox.com/v4/davidlindenbaum.2dbbqese/{z}/{x}/{y}.vector.pbf?access_token=' + mapboxAPIK, //"http://fileservercw01.labs.internal:8095/{z}/{x}/{y}.pbf",
    maxZoom: 17,
  })
});


footPrintLayer.setZIndex(7);
footPrintLayer.setOpacity(1.0)
footPrintLayer_Vegas.setZIndex(7);
footPrintLayer_Vegas.setOpacity(1.0)
footPrintLayerT.setZIndex(6);
footPrintLayerT.setOpacity(1.0)
roadLayer.setZIndex(7);
roadLayer.setOpacity(1.0)
aoiLayer.setOpacity(0.3)
aoiLayer.setZIndex(1)
footPrintLayer_Shanghai.setZIndex(7);
footPrintLayer_Shanghai.setOpacity(1.0)
footPrintLayer_Khartoum.setZIndex(7);
footPrintLayer_Khartoum.setOpacity(1.0)



const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new XYZ({
        url: 'https://{1-4}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png'
      })
    }),
    labels,
    footPrintLayerT,
    footPrintLayer_Vegas,
    footPrintLayer_Shanghai,
    footPrintLayer_Khartoum,
    aoiLayer
  ],
  view: new View({
    center: [0, 0],
    zoom: 2
  })
});

function onClick(id, callback) {
  document.getElementById(id).addEventListener('click', callback);
}

function zoomLoad(name, rgb="1,2,3", linearStretch="True", tileType="tiles", band1="5", band2="7") {
  if (ValidURL(name)) {
    var url = name //encodeURIComponent(name)
    var boundsUrl = "https://14ffxwyw5l.execute-api.us-east-1.amazonaws.com/production/bounds?url=" + url;

    getJSON(boundsUrl, function(result) {

      var extent = proj.transformExtent(result.bounds, 'EPSG:4326', 'EPSG:3857');
      map.getView().fit(extent, map.getSize());
      console.log(rgb)
      var tilesUrl = createTilesUrl(name, rgb, linearStretch, tileType);
      var cogLayer = new TileLayer({
        type: 'base',
        source: new XYZ({
          url: tilesUrl
        }),
        minZoom: 12
      });



      var layers = map.getLayers();
      layers.removeAt(7)
      //layers.removeAt(3); //remove the previous COG map, so we're not loading extra tiles as we move around.
      map.addLayer(cogLayer);
      //map.addLayer(footPrintLayerT)







      update({
        url: name
      });

    }).fail(function(jqXHR, textStatus, errorThrown) {
      alert("Request failed. Are you sure '" + name + "' is a valid COG?  ");
    });
    //TODO - include link to COG validator

  }
}

/* 
 * This creates the tiles URL. Change here to use another lambda server, or change the default params.
 * TODO: enable setting of things like RGB and linear stretch in the GUI, and then adjust the url's here.
 */
function createTilesUrl(url="", rgb="1,2,3", linearStretch="True", tileType="tiles", band1="5", band2="7") {
  return  "https://14ffxwyw5l.execute-api.us-east-1.amazonaws.com/production/"+tileType+ "/{z}/{x}/{y}.jpg?url=" + url + "&rgb=" + rgb + "&linearStretch=" + linearStretch+"&band1=" + band1 + "&band2="+band2;
}



//TODO: Add labels back in. Need a nice button for them, and also need to get them to overlay on the map.
// onClick('labels', function() {
//   labels.setVisible(document.getElementById("labels").checked);
// })

onClick('sample-1', function() {
  //spacenetURL = document.getElementById("cog-url").value // = spacenetURL;
  zoomLoad(spacenetURL_Vegas, "5,3,2", "true");//"1,2,3", "False");
});

onClick('sample-2', function() {
  //spacenetURL = document.getElementById("cog-url").value // = spacenetURL;
  zoomLoad(spacenetURL_Paris, "5,3,2", "true");
});

onClick('sample-3', function() {
  //spacenetURL = document.getElementById("cog-url").value // = spacenetURL;
  zoomLoad(spacenetURL_Shanghai, "5,3,2", "true"); //"7,5,3", "true");
});

onClick('sample-4', function() {
  //spacenetURL = document.getElementById("cog-url").value // = spacenetURL;
  zoomLoad(spacenetURL_Khartoum, "5,3,2", "true"); //"7,5,2", "true", "NDtiles");
});




function toggleControl(element) {
  console.log("called" + element)
  labels.setVisible(element.checked);

}

var state = {
  url: {
    default: "",
    deserialize: function (url) {
      return decodeURIComponent(url)
    },
    serialize: function (url) {
      return encodeURIComponent(url)
    }
  }
};

function listener(newState) {

  if ('url' in newState) {

    //TODO: refactor in to common method with the submit, so we don't duplicate code
    var tilesUrl = createTilesUrl(encodeURIComponent(newState.url));
    var cogLayer = new TileLayer({
      type: 'base',
      source: new XYZ({
        url: tilesUrl
      })
    });

    map.addLayer(cogLayer);
    //map.addLayer(footPrintLayer)
    //map.addLayer(footPrintLayerT)

    //document.getElementById("cog-url").value = newState.url;
    //This had an attempt to move to a COG location, but then it messed up with existing hashes.
    //May consider adding a button that will zoom the user to the location of the COG displayed.
  }
}

function ValidURL(str) {
  if (!validUrl.isUri(str)) {
    alert("'" + str + "' is not a valid URL. Did you forget to include http://? ");
    //TODO - automatically add in http:// if it's not included and check that.
    return false;
  } else {
    return true;
  }
}

// register a state provider
var update = hashed.register(state, listener);

// persist center and zoom in the URL hash
sync(map);
