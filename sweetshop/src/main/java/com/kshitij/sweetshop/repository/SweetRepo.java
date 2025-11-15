package com.kshitij.sweetshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.kshitij.sweetshop.model.Sweet;

import java.util.List;

public interface SweetRepo extends JpaRepository<Sweet, Long> {
    List<Sweet> findByNameContainingIgnoreCase(String name);
    List<Sweet> findByCategoryIgnoreCase(String category);

    @Query("SELECT s FROM Sweet s WHERE (:min is null OR s.price >= :min) AND (:max is null OR s.price <= :max)")
    List<Sweet> findByPriceRange(@Param("min") Double min, @Param("max") Double max);
}
