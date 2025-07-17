"use client";

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import React, { useEffect } from 'react';

const redIcon = new L.Icon({
  iconUrl: '/images/leaflet/marker-icon-2x-red.png',
  shadowUrl: '/images/leaflet/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface MonitoringPoint {
  id: string;
  name: string;
  location: string;
  status: "在线" | "离线" | "维护中";
  lat: number;
  lng: number;
}

interface MonitoringMapProps {
  points: MonitoringPoint[];
}

const MonitoringMap = ({ points }: MonitoringMapProps) => {
  const mapCenter: [number, number] = [28.3, 101.15]; 

  useEffect(() => {
    // Fix for default icon path issue in Next.js with Leaflet
    // @ts-ignore
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: '/images/leaflet/marker-icon-2x.png',
      iconUrl: '/images/leaflet/marker-icon-2x.png',
      shadowUrl: '/images/leaflet/marker-shadow.png',
    });
  }, []);

  return (
    <MapContainer center={mapCenter} zoom={10} style={{ height: '100%', width: '100%', borderRadius: 'inherit' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {points.map(point => (
        point.lat && point.lng && (
          <Marker key={point.id} position={[point.lat, point.lng]} icon={redIcon}>
            <Popup>
              <b>{point.name}</b><br />
              {point.location}<br />
              Status: {point.status}
            </Popup>
          </Marker>
        )
      ))}
    </MapContainer>
  );
};

export default MonitoringMap;