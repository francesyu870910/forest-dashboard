package com.forest.model;

import lombok.Data;
import javax.persistence.*;
import org.hibernate.annotations.Type;

@Data
@Entity
@Table(name = "geo_layers")
public class GeoLayer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Enumerated(EnumType.STRING)
    private LayerType type;
    
    @Column(columnDefinition = "jsonb")
    @Type(type = "json")
    private String geoJson;
    
    private String name;
    private String description;
    private LocalDateTime lastUpdate;
    
    public enum LayerType {
        FOREST_DISTRIBUTION,
        ROAD_NETWORK,
        WATER_SOURCES,
        FIRE_BREAKS
    }
} 