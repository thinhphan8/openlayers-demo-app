import Map from "ol/Map";
import View from "ol/View";
import ImageLayer from "ol/layer/Image";
import TileLayer from "ol/layer/Tile";
import ImageSource from "ol/source/Image";
import OSM from "ol/source/OSM.js";
import React, { useEffect, useRef } from "react";

const MapComponent = () => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    if (mapContainerRef.current) {
      // Khởi tạo bản đồ với phần tử DOM từ ref
      const map = new Map({
        target: mapContainerRef.current,
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        view: new View({
          center: [1390659.798668, 5144570.023792],
          zoom: 17,
        }),
      });

      // Dọn dẹp khi component bị hủy
      return () => {
        map.setTarget(null);
      };
    }
  }, []);

  return (
    <div ref={mapContainerRef} style={{ width: "100%", height: "100vh" }} />
  );
};

export default MapComponent;
