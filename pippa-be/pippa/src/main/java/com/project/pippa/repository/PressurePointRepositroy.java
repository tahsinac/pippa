package com.project.pippa.repository;

import com.project.pippa.model.PressurePoint;
import com.project.pippa.model.PressurePosition;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PressurePointRepositroy extends JpaRepository<PressurePoint, Integer> {
}
