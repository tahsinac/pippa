package com.project.pippa.service;

import com.project.pippa.model.Nutrition;
import com.project.pippa.repository.NutritionRepositroy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class NutritionService{

    @Autowired
    NutritionRepositroy nutritionRepositroy;

    public List<Nutrition> listAllNutrition(){
        return nutritionRepositroy.findAll();
    }

    public Nutrition getNutritionRecordByID(Integer id){
        return nutritionRepositroy.findById(id).get();
    }

    public void saveNutritionRecord(Nutrition nutrition){
        nutritionRepositroy.save(nutrition);
    }

    public void deleteNutritionRecord(Integer NutritionID){
        nutritionRepositroy.deleteById(NutritionID);
    }

}
