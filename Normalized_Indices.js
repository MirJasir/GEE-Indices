/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var imageVisParam = {"opacity":1,"bands":["SR_B5","SR_B4","SR_B3"],"min":7775.12,"max":14788.88,"gamma":1},
    imageVisParam1 = {"opacity":1,"bands":["nd"],"min":-0.011750783081845113,"max":0.4288821012262266,"palette":["6b0eff","0ae8ff","0aff77","fbff0c","ff0606"]},
    imageVisParam2 = {"opacity":1,"bands":["nd"],"min":0.02,"max":0.98,"palette":["ffffff","006400"]},
    imageVisParam3 = {"opacity":1,"bands":["nd"],"min":-0.32092259975281,"max":0.08118132576718065,"palette":["2c7bb6","abd9e9","ffffbf","fdae61","d7191c"]},
    imageVisParam4 = {"opacity":1,"bands":["nd"],"min":-0.3914296432524271,"max":0.07672845804773089,"palette":["ff0808","afff18","2312ff"]},
    imageVisParam5 = {"opacity":1,"bands":["nd"],"min":-0.2552060584635781,"max":0.05815996840657508,"palette":["8c510a","f6e8c3","1a9850"]};
/***** End of imports. If edited, may not auto-convert in the playground. *****/
var aoi = ee.FeatureCollection("projects/ee-mirjasir/assets/Srinagar_Boundary");

var Landsat9 = ee.ImageCollection("LANDSAT/LC09/C02/T1_L2")
              .filterBounds(aoi)
              .filterDate("2024-06-01","2024-10-01")
              .filterMetadata("CLOUD_COVER","less_than",20)
              .select("SR_B2","SR_B3","SR_B4","SR_B5","SR_B6","SR_B7")
              .median()
              .clip(aoi);
Map.addLayer(Landsat9, imageVisParam, "Landsat_9");

var NDVI = Landsat9.normalizedDifference(["SR_B5","SR_B4"]);
Map.addLayer(NDVI, imageVisParam1, "NDVI_img");

// var vegitation = ndvi.gte(0.2);
// Map.addLayer(vegitation, imageVisParam2, "NDVI_Vegitation_img");

var NDBI = Landsat9.normalizedDifference(["SR_B6","SR_B5"]);
Map.addLayer(NDBI, imageVisParam3, "NDBI_img");

var NDWI = Landsat9.normalizedDifference(["SR_B3","SR_B5"]);
Map.addLayer(NDWI, imageVisParam4, "NDWI_img");

var NDSI = Landsat9.normalizedDifference(["SR_B6","SR_B5"]);
Map.addLayer(NDSI, imageVisParam5, "NDSI_img");

Export.image.toDrive({
  image : NDVI,
  description : "NDVI_june_sep_2024",
  folder: "GEE_Climate",
  scale: 30,
  region : aoi
});

Export.image.toDrive({
  image : NDBI,
  description : "NDBI_june_sep_2024",
  folder: "GEE_Climate",
  scale: 30,
  region : aoi
});
               
Export.image.toDrive({
  image : NDWI,
  description : "NDWI_june_sep_2024",
  folder: "GEE_Climate",
  scale: 30,
  region : aoi
});

Export.image.toDrive({
  image : NDSI,
  description : "NDSI_june_sep_2024",
  folder: "GEE_Climate",
  scale: 30,
  region : aoi
});