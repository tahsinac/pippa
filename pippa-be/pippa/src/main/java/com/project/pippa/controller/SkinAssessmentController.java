package com.project.pippa.controller;

import com.project.pippa.model.SkinAssessment;
import com.project.pippa.service.SkinAssessmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/skin-assessment")
public class SkinAssessmentController {

    @Autowired
    SkinAssessmentService skinAssessmentService;

    @GetMapping("")
    public ResponseEntity<?> getSkinAssessment(){
        try{
            List<SkinAssessment> skinAssessmentList = skinAssessmentService.listAllSkinAssessment();
            return new ResponseEntity<List<SkinAssessment>>(skinAssessmentList, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<SkinAssessment> getSkinAssessmentByID(@PathVariable Integer id){
        try{
            SkinAssessment skinAssessment = skinAssessmentService.getSkinAssessmentByID(id);
            return new ResponseEntity<SkinAssessment>(skinAssessment, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/patient/{id}")
    public ResponseEntity<?> getSkinAssessmentByPatientID(@PathVariable Integer id){
        try{
            List<SkinAssessment> skinAssessmentList = skinAssessmentService.listSkinAssessmentByPatientID(id);
            SkinAssessment latestSkinAssessment = skinAssessmentList.get(skinAssessmentList.size()-1);
            return new ResponseEntity<SkinAssessment>(latestSkinAssessment, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    //Get the latest bradenscore for a patientID
    @GetMapping("/bscore/{id}")
    public ResponseEntity<?> getBradenScore(@PathVariable Integer id){
        try{
            List<SkinAssessment> skinAssessmentList = skinAssessmentService.listSkinAssessmentByPatientID(id);
            SkinAssessment latestSkinAssessment = skinAssessmentList.get(skinAssessmentList.size()-1);
            int bradenScore = skinAssessmentService.getBradenScore(latestSkinAssessment);
            return new ResponseEntity<>(bradenScore, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/patient/bscore-total/{id}")
    public ResponseEntity<?> getListOfBScoreByPatientID(@PathVariable Integer id){
        try{
            List<SkinAssessment> skinAssessmentList = skinAssessmentService.listSkinAssessmentByPatientID(id);
            List<HashMap<String, String>> bScoreList = new ArrayList<>();

            for (SkinAssessment skinAssessment: skinAssessmentList) {
                HashMap<String, String> bScoreMap = new HashMap<>();
                Integer bScore = skinAssessment.getFrictionShear() + skinAssessment.getMoisture() +
                        skinAssessment.getFrictionShear() + skinAssessment.getMobility() +
                        skinAssessment.getNutrition();
                bScoreMap.put("datetime", skinAssessment.getDateAndTime());
                bScoreMap.put("braden", String.valueOf(bScore));
                bScoreList.add(bScoreMap);
            }
            return new ResponseEntity<>(bScoreList , HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("")
    public ResponseEntity<?> addSkinAssessment(@RequestBody SkinAssessment skinAssessment){
        try{
            skinAssessmentService.saveSkinAssessment(skinAssessment);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSkinAssessment(@PathVariable Integer id){
        try{
            skinAssessmentService.deleteSkinAssessment(id);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}