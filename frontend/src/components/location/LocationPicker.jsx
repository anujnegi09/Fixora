import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";

import {
  reverseGeocode,
  searchLocation,
} from "../../features/location/locationThunks";

import {
  selectLocation,
  selectSearchResults,
  selectReverseGeocodeLoading,
} from "../../features/location/locationSelectors";

function ChangeMapView({ center }) {
  const map = useMap();

  useEffect(() => {
    if (!map || !map.getContainer()) return;

    map.setView(center, 16);
  }, [center, map]);

  return null;
}
// function ChangeMapView({ center }) {
//   const map = useMap();

//   useEffect(() => {
//     map.setView(center, 16);
//   }, [center, map]);

//   return null;
// }

function LocationSelector({ onLocationChange }) {
  useMapEvents({
    click(event) {
      const { lat, lng } = event.latlng;

      onLocationChange(lat, lng);
    },
  });

  return null;
}

const LocationPicker = ({ onClose, onSaveLocation }) => {
  const dispatch = useDispatch();

  const selectedLocation = useSelector(selectLocation);
  const searchResults = useSelector(selectSearchResults);
  const loading = useSelector(selectReverseGeocodeLoading);

  const [position, setPosition] = useState([
    20.5937,
    78.9629,
  ]);

  const [search, setSearch] = useState("");

  // ==========================
  // Update marker + reverse geocode
  // ==========================

  const handleLocationChange = (lat, lng) => {
    const latitude = Number(lat);
    const longitude = Number(lng);

    console.log("SELECTED LATITUDE:", latitude);
    console.log("SELECTED LONGITUDE:", longitude);

    setPosition([latitude, longitude]);

    dispatch(
      reverseGeocode({
        lat: latitude,
        lng: longitude,
      })
    );
  };

  // ==========================
  // Current location
  // ==========================

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (location) => {
        const latitude = location.coords.latitude;
        const longitude = location.coords.longitude;

        console.log("CURRENT LATITUDE:", latitude);
        console.log("CURRENT LONGITUDE:", longitude);

        handleLocationChange(latitude, longitude);
      },
      (error) => {
        alert(error.message);
      },
      {
        enableHighAccuracy: true,
      }
    );
  };

  // ==========================
  // Save Location
  // ==========================

  const handleSaveLocation = async () => {
    try {
      if (!onSaveLocation) return;

      /*
       * IMPORTANT:
       * selectedLocation contains the address information
       * from reverse geocoding.
       *
       * position contains the actual selected map coordinates.
       */

      const locationData = {
        address: selectedLocation?.address || "",
        city: selectedLocation?.city || "",
        state: selectedLocation?.state || "",
        pincode: selectedLocation?.pincode || "",

        latitude: Number(position[0]),
        longitude: Number(position[1]),
      };

      console.log("LOCATION BEING SAVED:", locationData);

      await onSaveLocation(locationData);

      setSearch("");

      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error(error);
    }
  };

  function FixMapSize() {
  const map = useMap();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (map && map.getContainer()) {
        map.invalidateSize();
      }
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [map]);

  return null;
}
  // function FixMapSize() {
  //   const map = useMap();

  //   useEffect(() => {
  //     setTimeout(() => {
  //       map.invalidateSize();
  //     }, 100);
  //   }, [map]);

  //   return null;
  // }

  return (
    <>
      {/* Search */}

      <div>
        <input
          type="text"
          value={search}
          onChange={(e) => {
            const value = e.target.value;

            setSearch(value);

            if (value.length > 2) {
              dispatch(searchLocation(value));
            }
          }}
          placeholder="Search location..."
          className="
            w-full
            rounded-lg
            border
            border-gray-300
            px-4
            py-3
            outline-none
            focus:border-blue-500
          "
        />

        {searchResults.length > 0 && (
          <div className="mt-2 max-h-48 overflow-y-auto rounded-lg border bg-white shadow">
            {searchResults.map((item, index) => (
              <button
                key={index}
                type="button"
                onClick={() => {
                  setSearch(item.display_name);

                  handleLocationChange(
                    Number(item.lat),
                    Number(item.lon)
                  );
                }}
                className="
                  w-full
                  border-b
                  p-3
                  text-left
                  hover:bg-gray-100
                "
              >
                {item.display_name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Current Location */}

      <button
        type="button"
        onClick={getCurrentLocation}
        className="
          rounded-lg
          bg-blue-600
          px-4
          py-2
          text-white
          hover:bg-blue-700
        "
      >
        Use Current Location
      </button>

      {/* Loader */}

      {loading && (
        <div className="flex items-center gap-2 text-blue-600">
          <div
            className="
              h-4
              w-4
              animate-spin
              rounded-full
              border-2
              border-blue-600
              border-t-transparent
            "
          />

          <span>Fetching location...</span>
        </div>
      )}

      {/* Map */}

      <MapContainer
  center={position}
  zoom={15}
  style={{
    width: "100%",
    height: "250px",
    borderRadius: "12px",
  }}
  whenReady={(event) => {
    setTimeout(() => {
      event.target.invalidateSize();
    }, 300);
  }}
>
      {/* <MapContainer
        center={position}
        zoom={15}
        style={{
          width: "100%",
          height: "250px",
          borderRadius: "12px",
        }}
      > */}
        {/* <FixMapSize /> */}

        <ChangeMapView center={position} />

        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <LocationSelector
          onLocationChange={handleLocationChange}
        />

        <Marker
          position={position}
          draggable={true}
          eventHandlers={{
            dragend: (event) => {
              const { lat, lng } =
                event.target.getLatLng();

              handleLocationChange(lat, lng);
            },
          }}
        />
      </MapContainer>

      {/* Selected Location */}

      <div className="rounded-lg border bg-gray-50 p-4">
        <h3 className="mb-2 font-semibold">
          Selected Location
        </h3>

        <p>
          <strong>State:</strong>{" "}
          {selectedLocation?.state || "-"}
        </p>

        <p>
          <strong>City:</strong>{" "}
          {selectedLocation?.city || "-"}
        </p>

        <p>
          <strong>Pincode:</strong>{" "}
          {selectedLocation?.pincode || "-"}
        </p>

        <p className="mt-2 text-sm text-gray-600">
          {selectedLocation?.address || "-"}
        </p>
      </div>

      {/* Save */}

      <button
        type="button"
        onClick={handleSaveLocation}
        className="
          w-full
          rounded-lg
          bg-green-600
          py-3
          text-white
          hover:bg-green-700
        "
      >
        Save Location
      </button>
    </>
  );
};

export default LocationPicker;


















// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";

// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   useMap,
//   useMapEvents,
// } from "react-leaflet";

// import {
//   reverseGeocode,
//   searchLocation,
// } from "../../features/location/locationThunks";

// import {
//   selectLocation,
//   selectSearchResults,
//   selectReverseGeocodeLoading,
// } from "../../features/location/locationSelectors";

// function ChangeMapView({ center }) {
//   const map = useMap();

//   useEffect(() => {
//     map.setView(center, 16);
//   }, [center, map]);

//   return null;
// }

// function LocationSelector({ onLocationChange }) {
//   useMapEvents({
//     click(event) {
//       const { lat, lng } = event.latlng;

//       onLocationChange(lat, lng);
//     },
//   });

//   return null;
// }

// const LocationPicker = ({ onClose, onSaveLocation }) => {
//   const dispatch = useDispatch();

//   const selectedLocation = useSelector(selectLocation);
//   const searchResults = useSelector(selectSearchResults);
//   const loading = useSelector(selectReverseGeocodeLoading);

//   const [position, setPosition] = useState([
//     20.5937,
//     78.9629,
//   ]);

//   const [search, setSearch] = useState("");

//   // ==========================
//   // Update marker + reverse geocode
//   // ==========================

//   const handleLocationChange = (lat, lng) => {
//     setPosition([lat, lng]);

//     dispatch(
//       reverseGeocode({
//         lat,
//         lng,
//       })
//     );
//   };

//   // ==========================
//   // Current location
//   // ==========================

//   const getCurrentLocation = () => {
//     if (!navigator.geolocation) {
//       alert("Geolocation is not supported.");
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       (location) => {
//         handleLocationChange(
//           location.coords.latitude,
//           location.coords.longitude
//         );
//       },
//       (error) => {
//         alert(error.message);
//       },
//       {
//         enableHighAccuracy: true,
//       }
//     );
//   };

//   // ==========================
//   // Save Location
//   // ==========================

//   const handleSaveLocation = async () => {
//     try {
//       if (onSaveLocation) {
//         await onSaveLocation(selectedLocation);
//       }

//       setSearch("");

//       if (onClose) {
//         onClose();
//       }

//     } catch (error) {
//       console.error(error);
//     }
//   };

//   function FixMapSize() {
//   const map = useMap();

//   useEffect(() => {
//     setTimeout(() => {
//       map.invalidateSize();
//     }, 100);
//   }, [map]);

//   return null;
// }

//   return (
//     <div className="space-y-4">

//       {/* Search */}

//       <div>
//         <input
//           type="text"
//           value={search}
//           onChange={(e) => {
//             const value = e.target.value;

//             setSearch(value);

//             if (value.length > 2) {
//               dispatch(searchLocation(value));
//             }
//           }}
//           placeholder="Search location..."
//           className="
//             w-full
//             rounded-lg
//             border
//             border-gray-300
//             px-4
//             py-3
//             outline-none
//             focus:border-blue-500
//           "
//         />

//         {searchResults.length > 0 && (
//           <div className="mt-2 max-h-48 overflow-y-auto rounded-lg border bg-white shadow">

//             {searchResults.map((item, index) => (
//               <button
//                 key={index}
//                 type="button"
//                 onClick={() => {
//                   setSearch(item.display_name);

//                   handleLocationChange(
//                     Number(item.lat),
//                     Number(item.lon)
//                   );
//                 }}
//                 className="
//                   w-full
//                   border-b
//                   p-3
//                   text-left
//                   hover:bg-gray-100
//                 "
//               >
//                 {item.display_name}
//               </button>
//             ))}

//           </div>
//         )}
//       </div>

//       {/* Current Location */}

//       <button
//         type="button"
//         onClick={getCurrentLocation}
//         className="
//           rounded-lg
//           bg-blue-600
//           px-4
//           py-2
//           text-white
//           hover:bg-blue-700
//         "
//       >
//         Use Current Location
//       </button>

//       {/* Loader */}

//       {loading && (
//         <div className="flex items-center gap-2 text-blue-600">

//           <div
//             className="
//               h-4
//               w-4
//               animate-spin
//               rounded-full
//               border-2
//               border-blue-600
//               border-t-transparent
//             "
//           />

//           <span>Fetching location...</span>

//         </div>
//       )}

//       {/* Map */}

//       <MapContainer
//         center={position}
//         zoom={15}
//         style={{
//           width: "100%",
//           height: "250px",
//           borderRadius: "12px",
//         }}
//       >
//         <FixMapSize />

//         <ChangeMapView center={position} />

//         <TileLayer
//           attribution="&copy; OpenStreetMap contributors"
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />

//         <LocationSelector
//           onLocationChange={handleLocationChange}
//         />

//         <Marker
//           position={position}
//           draggable={true}
//           eventHandlers={{
//             dragend: (event) => {
//               const { lat, lng } =
//                 event.target.getLatLng();

//               handleLocationChange(lat, lng);
//             },
//           }}
//         />

//       </MapContainer>

//       {/* Selected Location */}

//       <div className="rounded-lg border bg-gray-50 p-4">

//         <h3 className="mb-2 font-semibold">
//           Selected Location
//         </h3>

//         <p>
//           <strong>State:</strong>{" "}
//           {selectedLocation?.state || "-"}
//         </p>

//         <p>
//           <strong>City:</strong>{" "}
//           {selectedLocation?.city || "-"}
//         </p>

//         <p>
//           <strong>Pincode:</strong>{" "}
//           {selectedLocation?.pincode || "-"}
//         </p>

//         <p className="mt-2 text-sm text-gray-600">
//           {selectedLocation?.address || "-"}
//         </p>

//       </div>

//       {/* Save */}

//       <button
//         type="button"
//         onClick={handleSaveLocation}
//         className="
//           w-full
//           rounded-lg
//           bg-green-600
//           py-3
//           text-white
//           hover:bg-green-700
//         "
//       >
//         Save Location
//       </button>

//     </div>
//   );
// };

// export default LocationPicker;



// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   useMap,
//   useMapEvents,
// } from "react-leaflet";

// import {
//   reverseGeocode,
//   searchLocation,
// } from "../../features/location/locationThunks";

// import { updateLocation as updateUserLocation } from "../../features/user/userThunks";

// import {
//   selectLocation,
//   selectSearchResults,
//   selectReverseGeocodeLoading,
// } from "../../features/location/locationSelectors";

// function ChangeMapView({ center }) {
//   const map = useMap();

//   useEffect(() => {
//     map.setView(center, 16);
//   }, [center, map]);

//   return null;
// }

// function LocationSelector({ onLocationChange }) {
//   useMapEvents({
//     click(event) {
//       const { lat, lng } = event.latlng;
//       onLocationChange(lat, lng);
//     },
//   });

//   return null;
// }

// const LocationPicker = ({ onClose }) => {
//   const dispatch = useDispatch();

//   const selectedLocation = useSelector(selectLocation);
//   const searchResults = useSelector(selectSearchResults);
//   const loading = useSelector(selectReverseGeocodeLoading);

//   const [position, setPosition] = useState([20.5937, 78.9629]);
//   const [search, setSearch] = useState("");

//   // ==========================
//   // Update marker + reverse geocode
//   // ==========================

//   const handleLocationChange = (lat, lng) => {
//     setPosition([lat, lng]);

//     dispatch(
//       reverseGeocode({
//         lat,
//         lng,
//       })
//     );
//   };

//   // ==========================
//   // Current location
//   // ==========================

//   const getCurrentLocation = () => {
//     if (!navigator.geolocation) {
//       alert("Geolocation is not supported.");
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       (location) => {
//         handleLocationChange(
//           location.coords.latitude,
//           location.coords.longitude
//         );
//       },
//       (error) => {
//         alert(error.message);
//       },
//       {
//         enableHighAccuracy: true,
//       }
//     );
//   };

//   // ==========================
//   // Save Location
//   // ==========================

//   const handleSaveLocation = async () => {
//     try {
//       await dispatch(updateUserLocation(selectedLocation)).unwrap();

//       setSearch("");

//       if (onClose) {
//         onClose();
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="space-y-4">

//       {/* Search */}

//       <div>
//         <input
//           type="text"
//           value={search}
//           onChange={(e) => {
//             setSearch(e.target.value);

//             if (e.target.value.length > 2) {
//               dispatch(searchLocation(e.target.value));
//             }
//           }}
//           placeholder="Search location..."
//           className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
//         />

//         {searchResults.length > 0 && (
//           <div className="mt-2 max-h-48 overflow-y-auto rounded-lg border bg-white shadow">

//             {searchResults.map((item, index) => (
//               <button
//                 key={index}
//                 type="button"
//                 onClick={() => {
//                   setSearch(item.display_name);

//                   handleLocationChange(
//                     Number(item.lat),
//                     Number(item.lon)
//                   );
//                 }}
//                 className="w-full border-b p-3 text-left hover:bg-gray-100"
//               >
//                 {item.display_name}
//               </button>
//             ))}

//           </div>
//         )}
//       </div>

//       {/* Current Location */}

//       <button
//         onClick={getCurrentLocation}
//         className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
//       >
//         Use Current Location
//       </button>

//       {/* Loader */}

//       {loading && (
//         <div className="flex items-center gap-2 text-blue-600">
//           <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>

//           <span>Fetching location...</span>
//         </div>
//       )}

//       {/* Map */}

//       <MapContainer
//         center={position}
//         zoom={15}
//         style={{
//           width: "100%",
//           height: "250px",
//           borderRadius: "12px",
//         }}
//       >
//         <ChangeMapView center={position} />

//         <TileLayer
//           attribution="&copy; OpenStreetMap contributors"
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />

//         <LocationSelector
//           onLocationChange={handleLocationChange}
//         />

//         <Marker
//           position={position}
//           draggable={true}
//           eventHandlers={{
//             dragend: (event) => {
//               const { lat, lng } = event.target.getLatLng();

//               handleLocationChange(lat, lng);
//             },
//           }}
//         />
//       </MapContainer>

//       {/* Selected Location */}

//       <div className="rounded-lg border bg-gray-50 p-4">

//         <h3 className="mb-2 font-semibold">
//           Selected Location
//         </h3>

//         <p>
//           <strong>State:</strong>{" "}
//           {selectedLocation?.state || "-"}
//         </p>

//         <p>
//           <strong>City:</strong>{" "}
//           {selectedLocation?.city || "-"}
//         </p>

//         <p>
//           <strong>Pincode:</strong>{" "}
//           {selectedLocation?.pincode || "-"}
//         </p>

//         <p className="mt-2 text-sm text-gray-600">
//           {selectedLocation?.address || "-"}
//         </p>

//       </div>

//       {/* Save */}

//       <button
//         onClick={handleSaveLocation}
//         className="w-full rounded-lg bg-green-600 py-3 text-white hover:bg-green-700"
//       >
//         Save Location
//       </button>

//     </div>
//   );
// };

// export default LocationPicker;