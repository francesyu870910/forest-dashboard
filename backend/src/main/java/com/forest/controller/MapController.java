package com.forest.controller;

import com.forest.model.*;
import com.forest.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/map")
@CrossOrigin
public class MapController {
    @Autowired
    private MonitoringPointRepository monitoringPointRepo;
    
    @Autowired
    private FirePointRepository firePointRepo;
    
    @Autowired
    private GeoLayerRepository geoLayerRepo;
    
    @Autowired
    private MonitoringDataRepository monitoringDataRepo;
    
    // Monitoring Points endpoints
    @GetMapping("/points")
    public ResponseEntity<List<MonitoringPoint>> getAllPoints(
        @RequestParam(required = false) MonitoringPoint.PointType type,
        @RequestParam(required = false) String region,
        @RequestParam(required = false) Double minLat,
        @RequestParam(required = false) Double maxLat,
        @RequestParam(required = false) Double minLng,
        @RequestParam(required = false) Double maxLng
    ) {
        if (type != null) {
            return ResponseEntity.ok(monitoringPointRepo.findByType(type));
        } else if (region != null) {
            return ResponseEntity.ok(monitoringPointRepo.findByRegion(region));
        } else if (minLat != null && maxLat != null && minLng != null && maxLng != null) {
            return ResponseEntity.ok(monitoringPointRepo.findPointsInBounds(minLat, maxLat, minLng, maxLng));
        }
        return ResponseEntity.ok(monitoringPointRepo.findAll());
    }
    
    // Fire Points endpoints
    @GetMapping("/fire-points")
    public ResponseEntity<List<FirePoint>> getFirePoints(
        @RequestParam(required = false) FirePoint.FireLevel level,
        @RequestParam(required = false) String region,
        @RequestParam(required = false) Double minLat,
        @RequestParam(required = false) Double maxLat,
        @RequestParam(required = false) Double minLng,
        @RequestParam(required = false) Double maxLng
    ) {
        if (level != null) {
            return ResponseEntity.ok(firePointRepo.findByLevel(level));
        } else if (region != null) {
            return ResponseEntity.ok(firePointRepo.findByRegion(region));
        } else if (minLat != null && maxLat != null && minLng != null && maxLng != null) {
            return ResponseEntity.ok(firePointRepo.findPointsInBounds(minLat, maxLat, minLng, maxLng));
        }
        return ResponseEntity.ok(firePointRepo.findAll());
    }
    
    // GeoJSON Layer endpoints
    @GetMapping("/layers/{type}")
    public ResponseEntity<GeoLayer> getLayer(@PathVariable GeoLayer.LayerType type) {
        return geoLayerRepo.findByType(type)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/layers")
    public ResponseEntity<List<GeoLayer>> getAllLayers() {
        return ResponseEntity.ok(geoLayerRepo.findAll());
    }
    
    // Status update endpoints
    @PatchMapping("/points/{id}/status")
    public ResponseEntity<MonitoringPoint> updatePointStatus(
        @PathVariable Long id,
        @RequestBody Map<String, MonitoringPoint.PointStatus> status
    ) {
        return monitoringPointRepo.findById(id)
            .map(point -> {
                point.setStatus(status.get("status"));
                return ResponseEntity.ok(monitoringPointRepo.save(point));
            })
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PatchMapping("/fire-points/{id}/status")
    public ResponseEntity<FirePoint> updateFirePointStatus(
        @PathVariable Long id,
        @RequestBody Map<String, FirePoint.FireStatus> status
    ) {
        return firePointRepo.findById(id)
            .map(point -> {
                point.setStatus(status.get("status"));
                return ResponseEntity.ok(firePointRepo.save(point));
            })
            .orElse(ResponseEntity.notFound().build());
    }
    
    // Real-time data endpoints
    @GetMapping("/points/{id}/data")
    public ResponseEntity<MonitoringData> getPointLatestData(@PathVariable Long id) {
        return monitoringPointRepo.findById(id)
            .map(point -> ResponseEntity.ok(monitoringDataRepo.findLatestByPoint(point)))
            .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/points/{id}/data/history")
    public ResponseEntity<List<MonitoringData>> getPointHistoryData(
        @PathVariable Long id,
        @RequestParam LocalDateTime start,
        @RequestParam LocalDateTime end
    ) {
        return monitoringPointRepo.findById(id)
            .map(point -> ResponseEntity.ok(
                monitoringDataRepo.findByPointAndTimestampBetweenOrderByTimestampDesc(point, start, end)
            ))
            .orElse(ResponseEntity.notFound().build());
    }
}