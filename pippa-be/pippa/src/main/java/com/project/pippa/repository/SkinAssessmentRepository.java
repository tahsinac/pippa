package com.project.pippa.repository;

import com.project.pippa.model.SkinAssessment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface SkinAssessmentRepository extends JpaRepository<SkinAssessment, Integer>, CrudRepository<SkinAssessment, Integer> {
    List<SkinAssessment> findByPatientID(Integer patientID);
    
    @Query(value = "SELECT MAX(skinAssessmentID) FROM skinassessment", nativeQuery = true)
    int getLatestID();
}
