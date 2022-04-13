package com.project.pippa.service;

import com.project.pippa.model.PressurePosition;
import com.project.pippa.model.SkinAssessment;
import com.project.pippa.repository.PressurePositionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class PressurePositionService {

    @Autowired
    PressurePositionRepository pressurePositionRepository;

    public List<PressurePosition> listAllPressurePosition(){
        return pressurePositionRepository.findAll();
    }

    public PressurePosition getPressurePositionByID(Integer id){
        return pressurePositionRepository.findById(id).get();
    }

    public void savePressurePosition(PressurePosition pressurePosition){
        pressurePositionRepository.save(pressurePosition);
    }

    public List<PressurePosition> listPressurePositionByPatientID(Integer id){
        List<PressurePosition> test = pressurePositionRepository.findByPatientID(id);
        return test;
    }

    public void deletePressurePosition(Integer id){
        pressurePositionRepository.deleteById(id);
    }
}
