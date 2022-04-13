package com.project.pippa.controller;

import com.project.pippa.model.Nutrition;
import com.project.pippa.service.NutritionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/nutrition")
public class NutritionController {

    @Autowired
    NutritionService nutritionService;

    @GetMapping("")
    public List<Nutrition> getNutrition(){
        return nutritionService.listAllNutrition();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Nutrition> getNutritionByID(@PathVariable Integer id){
        try {
            Nutrition nutrition = nutritionService.getNutritionRecordByID(id);
            return new ResponseEntity<Nutrition>(nutrition, HttpStatus.OK);
        }catch (NoSuchElementException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("")
    public ResponseEntity<?> addNutrition(@RequestBody Nutrition nutrition){
        try {
            nutritionService.saveNutritionRecord(nutrition);
            return new ResponseEntity<>(HttpStatus.CREATED);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> updatePatient(@RequestBody Nutrition nutrition, @PathVariable Integer id){
        try{
            Nutrition existingNutrition = nutritionService.getNutritionRecordByID(id);
            //Update the fields of the nutrition
            //Only for existing patient, method not allowed to change for a different
            existingNutrition.setBreakfast(nutrition.getBreakfast());
            existingNutrition.setLunch(nutrition.getLunch());
            existingNutrition.setDinner(nutrition.getDinner());
            existingNutrition.setWater(nutrition.getWater());
            //To Check Functionality - Save updated Nutrition
            nutritionService.saveNutritionRecord(existingNutrition);
            return new ResponseEntity<>(existingNutrition, HttpStatus.OK);
        }catch (NoSuchElementException e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePatient(@PathVariable Integer id){

        try{
            nutritionService.deleteNutritionRecord(id);
            return new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
