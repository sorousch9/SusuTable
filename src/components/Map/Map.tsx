import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import axios from "axios";
const apiKey = process.env.REACT_APP_GOOGLE_API as string;
const apiKeyMapAut = process.env.REACT_APP_MAP_AUT as string;

type MapData = {
  features: {
    geometry: {
      coordinates: [number, number];
    };
    properties: {
      __row_id__: string;
      __count__: string;
    };
  }[];
};

const containerStyle = {
  width: "100%",
  height: "49vh",
};

const center = {
  lat: 40.712776,
  lng: -74.005974,
};

const Map: React.FC = () => {
  const [mapData, setMapData] = useState<MapData | null>(null);
  useEffect(() => {
    const fetchMapData = async () => {
      try {
        const response = await axios.get<MapData>(
          `https://data.cityofnewyork.us/resource/if26-z6xq.geojson?$query=select%20snap_to_grid(%60location_point%60%2C0.00195313)%2Cmin(%3Aid)%20as%20__row_id__%2Ccount(*)%20as%20__count__%20where%20intersects(location_point,%20%27POLYGON((%20-74.53125%2040.44694705960049%20,-74.53125%2040.979898069620134%20,-73.828125%2040.979898069620134%20,-73.828125%2040.44694705960049%20,-74.53125%2040.44694705960049%20))%27)%20group%20by%20snap_to_grid(%60location_point%60%2C0.00195313)%20limit%2050000%20&$$query_timeout_seconds=60&$$read_from_nbe=true&$$version=2.1&$$app_token=${apiKeyMapAut}`
        );
        setMapData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMapData();
  }, []);

  return (
    <div className="map">
      <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
          {mapData?.features.map((feature) => (
            <Marker
              key={feature.properties.__row_id__}
              position={{
                lat: feature.geometry.coordinates[1],
                lng: feature.geometry.coordinates[0],
              }}
            />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Map;
