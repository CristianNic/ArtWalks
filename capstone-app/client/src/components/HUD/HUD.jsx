import React, { useEffect, useState, useCallback, useMemo } from "react";

import { neighbourhoods, API_URL } from '../Utils/Utils';

const HUD = () => {
	// const initialCenter = useMemo( () => map.getCenter(), [map] )
	// const initialZoom = useMemo( () => map.getZoom(), [map] )
	// const [mapCenter, setMapCenter] = useState(map.getCenter())

	// const onMove = useCallback(() => {
	//    setMapCenter(map.getCenter())
	// }, [map])
  

	// useEffect( () => {
	//    map.on('move', onMove)
	// }, [map, onMove])

	return (
		<section className="HUD">
			<h3>Select your Neighbourhood</h3>
      <div className="list-radio">
        {neighbourhoods.map((area, i) =>
          <div>
            <input onClick={e => console.log(`${area}-Radio`)} type="radio" id="huey" name="drone" value={area} key={i}/>
            <label for="huey">{area}</label>
          </div>
        )}

      </div>

      <div className="list-button">
        {neighbourhoods.map((area, i) =>
        <button className="list-button-button" onClick={e => console.log('Vancouver')} value={area} key={i}>{area}</button >
        )}
      </div>
      
		</section>
	);
};

export default HUD;
