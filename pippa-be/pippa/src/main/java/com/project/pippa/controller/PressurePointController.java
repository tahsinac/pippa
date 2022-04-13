package com.project.pippa.controller;

import com.project.pippa.model.PressurePoint;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.project.pippa.service.PressurePointService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/pressure-point")
public class PressurePointController {

    @Autowired
    PressurePointService pressurePointService;

    @GetMapping("")
    public ResponseEntity<?> getPressurePoint() {
        try {
            List<PressurePoint> pressurePointList = pressurePointService.listAllPressurePoints();
            return new ResponseEntity<List<PressurePoint>>(pressurePointList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<PressurePoint> getPressurePointByID(@PathVariable Integer id) {
        try {
            PressurePoint pressurePoint = pressurePointService.getPressurePointByID(id);
            return new ResponseEntity<PressurePoint>(pressurePoint, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("")
    public ResponseEntity<?> addPressurePosition(@RequestBody PressurePoint pressurePoint) {
        try {
            if (pressurePoint.getPositionRecordID() != null) {
                pressurePointService.savePressurePoint(pressurePoint);
                return new ResponseEntity<>(HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}