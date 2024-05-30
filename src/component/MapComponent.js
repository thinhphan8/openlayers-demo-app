import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM.js";
import ImageWMS from "ol/source/ImageWMS";
import ImageLayer from "ol/layer/Image";
import React, { useEffect, useRef } from "react";
import { defaults as DefaultControls } from "ol/control";

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
          new ImageLayer({
            source: new ImageWMS({
              url: "http://localhost:8080/geoserver/wms",
              params: { LAYERS: "vietnam:vn_province_boundary_polygon" },
              ratio: 1,
              serverType: "geoserver",
            }),
          }),
        ],
        view: new View({
          projection: "EPSG:4326",
          center: [105.8342, 21.0278],
          zoom: 10,
        }),
        controls: DefaultControls(),
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
