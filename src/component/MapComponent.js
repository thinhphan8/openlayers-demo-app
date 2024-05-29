import React, { useRef, useEffect } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSMSource from "ol/source/OSM";

const MapComponent = () => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    if (mapContainerRef.current) {
      // Khởi tạo bản đồ với phần tử DOM từ ref
      const map = new Map({
        target: mapContainerRef.current,
        layers: [
          new TileLayer({
            source: new OSMSource(),
          }),
        ],
        view: new View({
          center: [0, 0],
          zoom: 2,
        }),
      });

      // Dọn dẹp khi component bị hủy
      return () => {
        map.setTarget(null);
      };
    }
  }, []);

  return (
    <div ref={mapContainerRef} style={{ width: "100%", height: "500px" }} />
  );
};

export default MapComponent;
