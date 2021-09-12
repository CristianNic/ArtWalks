// Marker SVG icons created thanks to Chad Harms, UX Design Grad 2020 with Creative Commons 0 license (public domain).
// Lego Man Vector Graphic - https://freesvg.org/lego-man-vector-graphics
// FreeSVG.org offers free vector images in SVG format with Creative Commons 0 license (public domain).
// You can copy, modify, distribute and perform the work, even for commercial purposes, all without asking permission.
// It is absolutely not required, but if you like this website, any mention of or link back is highly appreciated.

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
import LegoMan from "../assets/icons/lego-man.svg";

// --------- Leaflet - Marker Icons --------------//
export const fountain = L.icon({
	iconUrl: Fountain,
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	// ToDO: find a better way of moving up popup - unlike leaflet, react leaflet does not like a negative number here
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
export const legoMan = L.icon({
	iconUrl: LegoMan,
	iconSize: [25, 41],
	iconAnchor: [12, 41],
});
