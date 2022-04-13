package com.project.pippa.service;

import com.project.pippa.model.SkinAssessment;
import com.project.pippa.repository.SkinAssessmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class SkinAssessmentService {

    @Autowired
    SkinAssessmentRepository skinAssessmentRepository;

    public List<SkinAssessment> listAllSkinAssessment(){
        return skinAssessmentRepository.findAll();
    }

    public SkinAssessment getSkinAssessmentByID(Integer id){
        return skinAssessmentRepository.findById(id).get();
    }

    public void saveSkinAssessment(SkinAssessment skinAssessment){
        skinAssessmentRepository.save(skinAssessment);
    }

    public void deleteSkinAssessment(Integer id){
        skinAssessmentRepository.deleteById(id);
    }

    public List<SkinAssessment> listSkinAssessmentByPatientID(Integer id){
        List<SkinAssessment> test = skinAssessmentRepository.findByPatientID(id);
        return test;
    }

    public Integer getBradenScore(SkinAssessment skinAssessment){

        int bradenScore = skinAssessment.getNutrition() +
                skinAssessment.getFrictionShear() +
                skinAssessment.getMobility() +
                skinAssessment.getMoisture() +
                skinAssessment.getSensoryPerception();
        return bradenScore;
    }
}
