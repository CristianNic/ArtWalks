const express = require("express");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();
const fs = require("fs");

function loadPublicArtData() {
  return fs.readFileSync("./data/publicArt.json", "utf8");
}
router.get("/", (req, res) => {
  const publicArt = JSON.parse(loadPublicArtData());

  const publicArtMapped = publicArt.map((record) => {
    return {
      recordid: record.recordid,
      status: record.fields.status,
      yearofinstallation: record.fields.yearofinstallation,
      sitename: record.sitename,
      url: record.url,
      primarymaterial: record.primarymaterial,
      artists:record.artists,
      type: record.type,
      neighbourhood: record.neighbourhood,
    };
  });
  console.log(res);
  res.json(publicArtMapped);
});

router.get("/:id",(req,res)=>{
	const list=JSON.parse(loadPublicArtData());
	const foundRecordID=list.findIndex((record)=>{   
      console.log(req.param.id);       
			return record.recordid===req.params.recordid;
	});
	res.json(list[foundRecordID]);
});

module.exports = router;
