package com.project.pippa.repository;

import com.project.pippa.model.Nutrition;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NutritionRepositroy extends JpaRepository<Nutrition, Integer> {
}
