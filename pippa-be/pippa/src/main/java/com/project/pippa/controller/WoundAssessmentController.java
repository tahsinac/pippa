package com.project.pippa.controller;


import com.project.pippa.model.WoundAssessment;
import com.project.pippa.service.WoundAssessmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/wound-assessment")
public class WoundAssessmentController {

    @Autowired
    WoundAssessmentService woundAssessmentService;

    @GetMapping("")
    public ResponseEntity<?> getWoundAssessment(){
        try{
            List<WoundAssessment> woundAssessmentList = woundAssessmentService.listAllWoundAssessment();
            return new ResponseEntity<List<WoundAssessment>>(woundAssessmentList, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<WoundAssessment> getWoundAssessmentByID(@PathVariable Integer id){
        try{
            WoundAssessment woundAssessment = woundAssessmentService.getWoundAssessmentByID(id);
            return new ResponseEntity<WoundAssessment>(woundAssessment, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("")
    public ResponseEntity<?> addWoundAssessment(@RequestBody WoundAssessment woundAssessment){
        try{
            if (woundAssessment.getSkinAssessmentID() != null) {
                woundAssessmentService.saveWoundAssessment(woundAssessment);
                return new ResponseEntity<>(HttpStatus.OK);
            }else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

}
