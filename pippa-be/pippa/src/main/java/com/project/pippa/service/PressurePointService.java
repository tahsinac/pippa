package com.project.pippa.service;

import com.project.pippa.model.PressurePoint;
import com.project.pippa.repository.PressurePointRepositroy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class PressurePointService {

    @Autowired
    PressurePointRepositroy pressurePointRepositroy;

    public List<PressurePoint> listAllPressurePoints(){
        return pressurePointRepositroy.findAll();
    }

    public PressurePoint getPressurePointByID(Integer id){
        return pressurePointRepositroy.findById(id).get();
    }

    public void savePressurePoint(PressurePoint pressurePoint){
        pressurePointRepositroy.save(pressurePoint);
    }

    public void deletePressurePoint(Integer id){
        pressurePointRepositroy.deleteById(id);
    }
}
