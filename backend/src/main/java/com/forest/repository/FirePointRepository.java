package com.forest.repository;

import com.forest.model.FirePoint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
import java.time.LocalDateTime;

public interface FirePointRepository extends JpaRepository<FirePoint, Long> {
    List<FirePoint> findByLevel(FirePoint.FireLevel level);
    List<FirePoint> findByStatus(FirePoint.FireStatus status);
    List<FirePoint> findByRegion(String region);
    List<FirePoint> findByDetectedTimeBetween(LocalDateTime start, LocalDateTime end);
    
    @Query("SELECT f FROM FirePoint f WHERE f.latitude BETWEEN :minLat AND :maxLat AND f.longitude BETWEEN :minLng AND :maxLng")
    List<FirePoint> findPointsInBounds(Double minLat, Double maxLat, Double minLng, Double maxLng);
} 