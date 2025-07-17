package com.forest.repository;

import com.forest.model.MonitoringPoint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface MonitoringPointRepository extends JpaRepository<MonitoringPoint, Long> {
    List<MonitoringPoint> findByType(MonitoringPoint.PointType type);
    List<MonitoringPoint> findByStatus(MonitoringPoint.PointStatus status);
    List<MonitoringPoint> findByRegion(String region);
    
    @Query("SELECT m FROM MonitoringPoint m WHERE m.latitude BETWEEN :minLat AND :maxLat AND m.longitude BETWEEN :minLng AND :maxLng")
    List<MonitoringPoint> findPointsInBounds(Double minLat, Double maxLat, Double minLng, Double maxLng);
} 