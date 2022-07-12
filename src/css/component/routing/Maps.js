import React, { useState } from 'react'
import Map from 'devextreme-react/map';
import { markersData, routesData } from './mapData.js';
function Maps() {
    const[routes,setRoutesData] = useState(routesData);
    return (
        <>
            <div>
                <h4>Route Overview</h4>
                <Map
                defaultZoom={14}
                height={440}
                width="100%"
                controls={true}
                markers={markersData}
                routes={routes}
                provider="bing"
                />
            </div>
        </>
    )
}

export default Maps
