import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents
} from "react-leaflet";

import { reverseGeocode } from "../../api/location.api.js";

function ChangeMapView({ center }) {
  const map = useMap();

  map.setView(center, 16);

  return null;
}

function LocationSelector({ updateLocation }) {

    useMapEvents({
        click(event) {
            const { lat, lng } = event.latlng;
            // console.log(lat, lng);
            updateLocation(lat, lng);
        },
    });
    return null;
}

const LocationPicker = () => {
  const [position, setPosition] = useState([20.5937, 78.9629]);

  const [selectedLocation, setSelectedLocation] = useState({
    address: "",
    city: "",
    state: "",
    pincode: "",
    latitude: null,
    longitude: null,
});

  const getCurrentLocation =() => {

    if (!navigator.geolocation) {
      alert("Geolocation is not supported.");
      return;
    }

    navigator.geolocation.getCurrentPosition(

       async (location) => {
        // console.log("Location object:", location);


        const lat = location.coords.latitude;
        const lng = location.coords.longitude;

        //  console.log("Latitude:", lat);
        //  console.log("Longitude:", lng);

        await updateLocation(lat, lng);
      },

      (error) => {

        alert(error.message);

      },

      {
        enableHighAccuracy: true,
      }

    );

  };

  const updateLocation = async (lat, lng) => {

    // Move marker
    setPosition([lat, lng]);
    

    try {

        const data = await reverseGeocode(lat, lng);

        console.log(data);

        setSelectedLocation({

            address: data.display_name,

            city:
                data.address.city ||
                data.address.town ||
                data.address.village ||
                "",

            state: data.address.state || "",

            pincode: data.address.postcode || "",

            latitude: lat,

            longitude: lng,

        });

    } catch (error) {

        console.error(error);

    }

};

  return (
    <div>

      <button
        onClick={getCurrentLocation}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Use Current Location
      </button>

      <MapContainer
        center={position}
        zoom={5}
        style={{
          height: "500px",
          width: "100%",
          borderRadius: "10px",
        }}
      >
        <ChangeMapView center={position} />

        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />


        <LocationSelector updateLocation={updateLocation}/>

        <Marker
    position={position}
    draggable={true}
    eventHandlers={{
        dragend: (event) => {

            const marker = event.target;

            const { lat, lng } = marker.getLatLng();

            console.log(lat, lng);

            setPosition([lat, lng]);

        },
    }}
/>

      </MapContainer>

      <div className="mt-5 rounded-xl border bg-white p-4 shadow">

  <h2 className="text-lg font-semibold mb-3">
    Selected Location
  </h2>

  <p>
    <strong>State:</strong> {selectedLocation.state}
  </p>

  <p>
    <strong>City:</strong> {selectedLocation.city}
  </p>

  <p>
    <strong>Pincode:</strong> {selectedLocation.pincode}
  </p>

  <p className="mt-2 text-gray-600">
    {selectedLocation.address}
  </p>

</div>

    </div>
  );
};

export default LocationPicker;