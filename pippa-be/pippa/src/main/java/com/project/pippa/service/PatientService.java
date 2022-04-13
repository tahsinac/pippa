package com.project.pippa.service;

import com.project.pippa.model.Patient;
import com.project.pippa.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class PatientService {

    @Autowired
    private PatientRepository patientRepository;

    public List<Patient> listAllPatient(){
        return patientRepository.findAll();
    }

    public void savePatient(Patient patient){
        patientRepository.save(patient);
    }

    public Patient getPatientByID(Integer patientID){
        return patientRepository.findById(patientID).get();
    }

    public void removePatient(Integer patientID){
        patientRepository.deleteById(patientID);
    }
}
