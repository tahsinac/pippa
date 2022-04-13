package com.project.pippa.controller;

import com.project.pippa.model.*;
import com.project.pippa.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/patients")
public class PatientController {

    @Autowired
    PatientService patientService;

    @GetMapping("")
    public List<Patient> getPatient(){
        return patientService.listAllPatient();
    }

    @GetMapping("/latest")
    public List<Patient> getLatestPatients(){

        List<Patient> patients = patientService.listAllPatient();

        List<Patient> latestPatients = new ArrayList<>();

        for (Patient patient: patients) {
            Patient tempPatient = new Patient();
            tempPatient.setId(patient.getId());
            tempPatient.setPatientName(patient.getPatientName());
            tempPatient.setBirthDate(patient.getBirthDate());

            if(patient.getNutritionList().size() > 0) {
                List<Nutrition> latestNutrition = new ArrayList<>();
                latestNutrition.add(patient.getNutritionList().get(patient.getNutritionList().size() - 1));
                tempPatient.setNutritionList(latestNutrition);
            }

            if(patient.getPressurePositionList().size() > 0) {
                List<PressurePosition> latestPressurePosition = new ArrayList<>();
                latestPressurePosition.add(patient.getPressurePositionList().get(patient.getPressurePositionList().size() - 1));
                tempPatient.setPressurePositionList(latestPressurePosition);
            }

            if(patient.getSkinAssessmentList().size() > 0) {
                List<SkinAssessment> latestSkinAssessment = new ArrayList<>();
                latestSkinAssessment.add(patient.getSkinAssessmentList().get(patient.getSkinAssessmentList().size() - 1));
                tempPatient.setSkinAssessmentList(latestSkinAssessment);
            }
            latestPatients.add(tempPatient);
        }
        return latestPatients;
    }


    @GetMapping("/{id}")
    public ResponseEntity<Patient> getPatientByID(@PathVariable Integer id){
        try {
            Patient patient = patientService.getPatientByID(id);
            return new ResponseEntity<Patient>(patient, HttpStatus.OK);
        }catch (NoSuchElementException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("")
    public ResponseEntity<?> addPatient(@RequestBody Patient patient){
        try {
            patientService.savePatient(patient);
            return new ResponseEntity<>(HttpStatus.CREATED);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> updatePatient(@RequestBody Patient patient, @PathVariable Integer id){
        try{
            Patient existingPatient = patientService.getPatientByID(id);
            //Update the fields of the patient
            existingPatient.setId(patient.getId());
            existingPatient.setPatientName(patient.getPatientName());
            existingPatient.setBirthDate(patient.getBirthDate());
            //To Check Functionality - Save updated Patient
            patientService.savePatient(existingPatient);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (NoSuchElementException e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePatient(@PathVariable Integer id){
        try {
            patientService.removePatient(id);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
