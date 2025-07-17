"use client"

import { useState, useEffect, useRef } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  MapPin, 
  Flame, 
  Camera, 
  Thermometer, 
  CloudRain, 
  Layers, 
  Plus, 
  Minus,
  RefreshCw
} from "lucide-react"
import { Viewer, Entity, GeoJsonDataSource, PolylineGraphics, PointGraphics, LabelGraphics, PolygonGraphics } from "resium";
import { Cartesian3, Color } from "cesium";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;  
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon.src,
    iconRetinaUrl: markerIcon2x.src,
    shadowUrl: markerShadow.src,
});

// 定义监测点类型
interface MonitoringPoint {
  id: string
  name: string
  type: "camera" | "sensor" | "weather" | "fire"
  lat: number
  lng: number
  status: "normal" | "warning" | "danger" | "offline"
  lastUpdate: string
  region?: string // 添加区域标识
}

// 定义火情点类型
interface FirePoint {
  id: string
  lat: number
  lng: number
  level: "low" | "medium" | "high"
  detected: string
  status: "active" | "controlled" | "extinguished"
  region?: string // 添加区域标识
}

// 示例GeoJSON数据（实际可替换为接口/文件加载）
const forestGeoJson = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": { "type": "林相分布" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [101.25, 27.90],
            [101.28, 27.92],
            [101.30, 27.89],
            [101.27, 27.88],
            [101.25, 27.90]
          ]
        ]
      }
    }
  ]
};
const roadGeoJson = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": { "type": "道路网" },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [101.24, 27.91],
          [101.29, 27.93],
          [101.31, 27.90]
        ]
      }
    }
  ]
};
const waterGeoJson = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": { "type": "水源点" },
      "geometry": {
        "type": "Point",
        "coordinates": [101.26, 27.91]
      }
    }
  ]
};
const firebreakGeoJson = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": { "type": "防火隔离带" },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [101.23, 27.89],
          [101.32, 27.91]
        ]
      }
    }
  ]
};

// 用divIcon渲染SVG图片
const cameraIcon = L.divIcon({
  html: '<img src="/icons/camera.svg" style="width:28px;height:28px;" />',
  className: '',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});
const sensorIcon = L.divIcon({
  html: '<img src="/icons/sensor.svg" style="width:28px;height:28px;" />',
  className: '',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});
const weatherIcon = L.divIcon({
  html: '<img src="/icons/weather.svg" style="width:28px;height:28px;" />',
  className: '',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});
const fireIcon = L.divIcon({
  html: '<img src="/icons/fire.svg" style="width:28px;height:28px;" />',
  className: '',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

// 木里县各乡的点位（大致坐标，后续可微调）
const points = [
  { name: "木里县城", lat: 27.928, lng: 101.280, type: "camera", status: "normal", lastUpdate: "1分钟前" },
  { name: "卡拉乡", lat: 27.900, lng: 101.250, type: "sensor", status: "warning", lastUpdate: "2分钟前" },
  { name: "博窝乡", lat: 27.880, lng: 101.300, type: "weather", status: "normal", lastUpdate: "5分钟前" },
  { name: "屋斯乡", lat: 27.950, lng: 101.200, type: "sensor", status: "danger", lastUpdate: "1分钟前" },
  { name: "水洛乡", lat: 28.000, lng: 101.270, type: "weather", status: "normal", lastUpdate: "7分钟前" },
  { name: "项脚乡", lat: 28.050, lng: 101.220, type: "sensor", status: "normal", lastUpdate: "10分钟前" },
  { name: "李子坪", lat: 28.030, lng: 101.340, type: "sensor", status: "warning", lastUpdate: "4分钟前" },
  { name: "新桥乡", lat: 27.865, lng: 101.360, type: "sensor", status: "normal", lastUpdate: "9分钟前" },
  { name: "瓦厂林区", lat: 27.920, lng: 101.230, type: "camera", status: "normal", lastUpdate: "4分钟前" },
  { name: "俄古沟林区", lat: 27.870, lng: 101.290, type: "camera", status: "warning", lastUpdate: "3分钟前" },
  { name: "彝海自然保护区", lat: 27.820, lng: 101.150, type: "camera", status: "normal", lastUpdate: "8分钟前" },
  { name: "直孔乡", lat: 27.780, lng: 101.310, type: "weather", status: "normal", lastUpdate: "12分钟前" },
  { name: "三桷桠", lat: 27.895, lng: 101.180, type: "camera", status: "normal", lastUpdate: "6分钟前" },
];

const firePoints = [
  { time: "10:30", description: "卡拉乡发现明火点，需立即处理", level: "紧急", lat: 27.900, lng: 101.250 },
  { time: "10:25", description: "博窝乡烟雾浓度超标，疑似初期火情", level: "高危", lat: 27.880, lng: 101.300 },
  { time: "10:20", description: "无人机热成像发现可疑热点", level: "中危", lat: 27.950, lng: 101.200 },
  { time: "10:15", description: "水洛乡防火巡查任务已完成", level: "一般", lat: 28.000, lng: 101.270 },
  { time: "10:10", description: "卫星监测发现新增热点", level: "高危", lat: 27.870, lng: 101.290 },
  { time: "10:05", description: "屋斯乡红外监测异常，派出巡查队伍", level: "中危", lat: 27.950, lng: 101.200 },
];

function getLevelColor(level: string) {
  if (level === "紧急" || level === "高危") return "#F87171";
  if (level === "中危") return "#FBBF24";
  return "#60A5FA";
}
function getLevelBg(level: string) {
  if (level === "紧急" || level === "高危") return "#F87171";
  if (level === "中危") return "#FBBF24";
  return "#60A5FA";
}

function getPointIcon(type: string) {
  if (type === "camera") return cameraIcon;
  if (type === "sensor") return sensorIcon;
  if (type === "weather") return weatherIcon;
  return cameraIcon; // 兜底，防止丢失
}

export default function ForestMap() {
  return (
    <div style={{ width: '100%', height: 500 }}>
      <MapContainer center={[27.92, 101.28]} zoom={10} style={{ width: '100%', height: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* 监测点 */}
        {points.map((pt) => (
          <Marker
            key={pt.name}
            position={[pt.lat, pt.lng]}
            icon={getPointIcon(pt.type)}
          >
            <Popup>
              <div>
                <strong>{pt.name}</strong><br />
                类型: {pt.type}<br />
                状态: {pt.status}<br />
                更新时间: {pt.lastUpdate}
              </div>
            </Popup>
          </Marker>
        ))}
        {/* 火情点 */}
        {firePoints.map((fire, idx) => (
          <Marker
            key={fire.time + fire.description}
            position={[fire.lat, fire.lng]}
            icon={fireIcon}
          >
            <Popup>
              <div>
                <span style={{color: getLevelColor(fire.level), fontWeight: 'bold', marginRight: 8}}>{fire.time}</span>
                <span style={{
                  display: 'inline-block',
                  background: getLevelBg(fire.level),
                  color: '#fff',
                  borderRadius: 4,
                  padding: '2px 8px',
                  fontSize: 12,
                  marginLeft: 4
                }}>{fire.level}</span>
                <br />
                <span>{fire.description}</span>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}