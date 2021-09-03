import L from "leaflet";

//----------- Art Works Icons with borders ---------//
import Fountain from "../assets/art-works-rounded-corners/fountain.svg";
import Gateway from "../assets/art-works-rounded-corners/gateway.svg";
import Memorial from "../assets/art-works-rounded-corners/memorial.svg";
import Mosaic from "../assets/art-works-rounded-corners/mosaic.svg";
import Mural from "../assets/art-works-rounded-corners/mural.svg";
import SiteIntergrated from "../assets/art-works-rounded-corners/site-intergrated.svg";
import Statue from "../assets/art-works-rounded-corners/statue.svg";
import Totem from "../assets/art-works-rounded-corners/totem.svg";
import DefaultIconSkater from "../assets/icons/skateboarding.svg";

//------------- for Experimenting -----------------//
import redGithubicon from "../assets/icons/github-red-2px.svg";
import WalkingAvatar from "../assets/icons/walk-walking.svg";
import ManWalkingRight from "../assets/icons/man-walking-right.svg";
import ManHearing from "../assets/icons/man-hearing.svg";

// --------- Leaflet - Marker Icons --------------//
export const fountain = L.icon({
	iconUrl: Fountain,
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	// move up popup - unlike leaflet, react leaflet does not like a negative number here
  // it takes several clicks to make it work
	// popupAnchor: [0, -20],
});
export const gateway = L.icon({
	iconUrl: Gateway,
	iconSize: [25, 41],
	iconAnchor: [12, 41],
});
export const memorial = L.icon({
	iconUrl: Memorial,
	iconSize: [25, 41],
	iconAnchor: [12, 41],
});
export const mosaic = L.icon({
	iconUrl: Mosaic,
	iconSize: [25, 41],
	iconAnchor: [12, 41],
});
export const mural = L.icon({
	iconUrl: Mural,
	iconSize: [25, 41],
	iconAnchor: [12, 41],
});
export const siteIntergrated = L.icon({
	iconUrl: SiteIntergrated,
	iconSize: [25, 41],
	iconAnchor: [12, 41],
});
export const statue = L.icon({
	iconUrl: Statue,
	iconSize: [25, 41],
	iconAnchor: [12, 41],
});
export const totem = L.icon({
	iconUrl: Totem,
	iconSize: [25, 41],
	iconAnchor: [12, 41],
});
export const defaultIconSkater = L.icon({
	iconUrl: DefaultIconSkater,
	iconSize: [25, 41],
	iconAnchor: [12, 41],
});

//--------- Leaflet - Marker Icons - for Experimenting ------------//
export const redGithub = L.icon({
	iconUrl: redGithubicon,
	iconSize: [25, 41],
	iconAnchor: [12, 41],
});
export const walkingAvatar = L.icon({
	iconUrl: WalkingAvatar,
	iconSize: [25, 41],
	iconAnchor: [12, 41],
});
export const manWalkingRight = L.icon({
	iconUrl: ManWalkingRight,
	iconSize: [25, 41],
	iconAnchor: [12, 41],
});
export const manHearing = L.icon({
	iconUrl: ManHearing,
	iconSize: [25, 41],
	iconAnchor: [12, 41],
});
