package com.project.pippa.repository;

import com.project.pippa.model.WoundAssessment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WoundAssessmentRepository extends JpaRepository<WoundAssessment, Integer> {
}
