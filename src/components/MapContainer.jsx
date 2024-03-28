import React, { useEffect, useRef } from "react";
import "../styles/MapContainer.css";

const MapContainer = ({ coordinates }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const initMap = () => {
      const google = window.google;
      const map = new google.maps.Map(mapRef.current, {
        zoom: 15,
        center: coordinates,
      });

      new google.maps.Marker({
        position: coordinates,
        map: map,
      });
    };

    // Define el callback en el objeto window y carga el script si es necesario
    window.initMap = initMap;

    if (!window.google || !window.google.maps) {
      const script = document.createElement("script");
      const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    } else {
      initMap();
    }

    return () => {
      delete window.initMap;
    };
  }, [coordinates]); // Añade coordinates como dependencia para reaccionar a los cambios

  return <div ref={mapRef} className="map-container" />;
};

export default MapContainer;
