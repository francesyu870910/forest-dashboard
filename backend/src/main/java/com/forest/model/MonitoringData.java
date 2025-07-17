package com.forest.model;

import lombok.Data;
import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "monitoring_data")
public class MonitoringData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "point_id")
    private MonitoringPoint point;
    
    private Double temperature;    // 温度
    private Double humidity;       // 湿度
    private Double windSpeed;      // 风速
    private String windDirection;  // 风向
    private Double rainfall;       // 降雨量
    private Double smokeLevel;     // 烟雾浓度
    
    private LocalDateTime timestamp;
} 