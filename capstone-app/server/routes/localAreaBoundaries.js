const express = require("express");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();
const fs = require("fs");

function loadNeighbourhoodsBoundariesData() {
  return fs.readFileSync("./data/localAreaBoundaries.json", "utf8");
}