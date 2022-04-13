package com.project.pippa.controller;

import com.project.pippa.model.PressurePosition;
import com.project.pippa.model.SkinAssessment;
import com.project.pippa.service.PressurePositionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.criteria.CriteriaBuilder;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/pressure-position")
public class PressurePositionController {

    @Autowired
    PressurePositionService pressurePositionService;

    @GetMapping("")
    public ResponseEntity<?> getPressurePosition() {
        try {
            List<PressurePosition> pressurePositionList = pressurePositionService.listAllPressurePosition();
            return new ResponseEntity<List<PressurePosition>>(pressurePositionList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<PressurePosition> getPressurePositionByID(@PathVariable Integer id) {
        try {
            PressurePosition pressurePosition = pressurePositionService.getPressurePositionByID(id);
            return new ResponseEntity<PressurePosition>(pressurePosition, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/patient/{id}")
    public ResponseEntity<?> getPressurePositionByPatientID(@PathVariable Integer id){
        try{
            List<PressurePosition> pressurePositionList = pressurePositionService.listAllPressurePosition();
            PressurePosition latestPressurePosition = pressurePositionList.get(pressurePositionList.size()-1);
            return new ResponseEntity<PressurePosition>(latestPressurePosition, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("")
    public ResponseEntity<?> addPressurePosition(@RequestBody PressurePosition pressurePosition){
        try{
            pressurePositionService.savePressurePosition(pressurePosition);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> updatePressurePosition(@RequestBody PressurePosition pressurePosition,
                                                    @PathVariable Integer id){
        try {
            PressurePosition exisitingPressurePosition = pressurePositionService.getPressurePositionByID(id);
            // Update the fields of the pressure position
            if (pressurePosition.getPositionRecordID() != null) {
                exisitingPressurePosition.setPositionRecordID(pressurePosition.getPositionRecordID());
            }
            if (pressurePosition.getPatientID() != null) {
                exisitingPressurePosition.setPatientID(pressurePosition.getPatientID());
            }
            if (pressurePosition.getPositionDescription() != null) {
                exisitingPressurePosition.setPositionDescription(pressurePosition.getPositionDescription());
            }
            if (pressurePosition.getStartDate() != null) {
                exisitingPressurePosition.setStartDate(pressurePosition.getStartDate());
            }
            if (pressurePosition.getStartTime() != null) {
                exisitingPressurePosition.setStartTime(pressurePosition.getStartTime());
            }
            if (pressurePosition.getEndDate() != null) {
                exisitingPressurePosition.setEndDate(pressurePosition.getEndDate());
            }
            if (pressurePosition.getEndTime() != null) {
                exisitingPressurePosition.setEndTime(pressurePosition.getEndTime());
            }
            pressurePositionService.savePressurePosition(exisitingPressurePosition);
            return new ResponseEntity<>(exisitingPressurePosition, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePatient(@PathVariable Integer id){
        try{
            pressurePositionService.deletePressurePosition(id);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
