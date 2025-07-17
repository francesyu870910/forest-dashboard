package com.forest.repository;

import com.forest.model.GeoLayer;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface GeoLayerRepository extends JpaRepository<GeoLayer, Long> {
    Optional<GeoLayer> findByType(GeoLayer.LayerType type);
    Optional<GeoLayer> findByName(String name);
} 