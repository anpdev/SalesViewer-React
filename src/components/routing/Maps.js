import React from 'react'
import Map,{ApiKey} from 'devextreme-react/map';

function Maps(props) {
    console.log('props',props);
    return (
        <>
            <div>
                <h4>Route Overview</h4>
                <Map
                defaultZoom={25}
                height={440}
                width="100%"
                controls={true}
                markers={props.markersData}
                routes={props.routesData}
                provider="bing"
                type='roadmap'
                >
                    <ApiKey
                        bing="AhkxbBKrdtwpBlDH02bE1r1pl4WtnCMmetj7SxuguSX3J32UYXugnRSUds0FyH9B"
                    />
                </Map>
            </div>
        </>
    )
}

export default Maps
