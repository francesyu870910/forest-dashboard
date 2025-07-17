package com.forest.repository;

import com.forest.model.MonitoringData;
import com.forest.model.MonitoringPoint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.time.LocalDateTime;
import java.util.List;

public interface MonitoringDataRepository extends JpaRepository<MonitoringData, Long> {
    List<MonitoringData> findByPointOrderByTimestampDesc(MonitoringPoint point);
    List<MonitoringData> findByPointAndTimestampBetweenOrderByTimestampDesc(
        MonitoringPoint point, 
        LocalDateTime start, 
        LocalDateTime end
    );
    
    @Query("SELECT md FROM MonitoringData md WHERE md.point = :point AND md.timestamp = " +
           "(SELECT MAX(md2.timestamp) FROM MonitoringData md2 WHERE md2.point = :point)")
    MonitoringData findLatestByPoint(MonitoringPoint point);
} 