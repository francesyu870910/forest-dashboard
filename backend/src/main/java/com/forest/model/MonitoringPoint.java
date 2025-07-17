package com.forest.model;

import lombok.Data;
import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "monitoring_points")
public class MonitoringPoint {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    
    @Enumerated(EnumType.STRING)
    private PointType type;
    
    private Double latitude;
    private Double longitude;
    
    @Enumerated(EnumType.STRING)
    private PointStatus status;
    
    private LocalDateTime lastUpdate;
    private String region;
    
    public enum PointType {
        CAMERA, SENSOR, WEATHER, FIRE
    }
    
    public enum PointStatus {
        NORMAL, WARNING, DANGER, OFFLINE
    }
} 