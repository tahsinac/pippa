package com.project.pippa.service;

import com.project.pippa.model.WoundAssessment;
import com.project.pippa.repository.SkinAssessmentRepository;
import com.project.pippa.repository.WoundAssessmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class WoundAssessmentService {

    @Autowired
    WoundAssessmentRepository woundAssessmentRepository;
    
    @Autowired
    SkinAssessmentRepository skinAssessmentRepository;

    public List<WoundAssessment> listAllWoundAssessment(){
        return woundAssessmentRepository.findAll();
    }

    public WoundAssessment getWoundAssessmentByID(Integer id){
        return woundAssessmentRepository.findById(id).get();
    }

    public void saveWoundAssessment(WoundAssessment woundAssessment){
        int skinAssessmentID = skinAssessmentRepository.getLatestID();
        woundAssessment.setSkinAssessmentID(skinAssessmentID);
        woundAssessmentRepository.save(woundAssessment);
    }

    public void deleteWoundAssessment(Integer id){
        woundAssessmentRepository.deleteById(id);
    }
}
