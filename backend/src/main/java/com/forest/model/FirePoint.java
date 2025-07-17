package com.forest.model;

import lombok.Data;
import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "fire_points")
public class FirePoint {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private Double latitude;
    private Double longitude;
    
    @Enumerated(EnumType.STRING)
    private FireLevel level;
    
    private LocalDateTime detectedTime;
    
    @Enumerated(EnumType.STRING)
    private FireStatus status;
    
    private String region;
    private String description;
    
    public enum FireLevel {
        LOW, MEDIUM, HIGH
    }
    
    public enum FireStatus {
        ACTIVE, CONTROLLED, EXTINGUISHED
    }
} 