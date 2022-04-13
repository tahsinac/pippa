package com.project.pippa.repository;

import com.project.pippa.model.PressurePosition;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PressurePositionRepository extends JpaRepository<PressurePosition, Integer> {
    List<PressurePosition> findByPatientID(Integer patientID);

}
