// Tiles from Mapbox.com,
// edit your style in Studio 
// Use raster tiles for this project https://docs.mapbox.com/api/maps/static-tiles/

export const USERNAME = "cristiannic"

export const ACCESS_TOKEN = "pk.eyJ1IjoiY3Jpc3RpYW5uaWMiLCJhIjoiY2tucHZmaXlsMDQzaTJ2bzA0MzRpeXFsaSJ9.zacBznM18ebDtNy1MNaGsw"

export const STYLE_OUTDOORS = "cknptyf770u1d17pjlw19290t"
export const STYLE_OUTDOORS_DARKER = "cknqo484x01vo17lfiwv2a8hj"

export const URL_CUSTOM_OUTDOORS = `https://api.mapbox.com/styles/v1/${USERNAME}/${STYLE_OUTDOORS}/tiles/256/{z}/{x}/{y}@2x?access_token=${ACCESS_TOKEN}`;

export const URL_CUSTOM_OUTDOORS_DARKER = `https://api.mapbox.com/styles/v1/${USERNAME}/${STYLE_OUTDOORS_DARKER}/tiles/256/{z}/{x}/{y}@2x?access_token=${ACCESS_TOKEN}`;








