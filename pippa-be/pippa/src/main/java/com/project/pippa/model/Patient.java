package com.project.pippa.model;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "PATIENT")
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String patientName;

    private String birthDate;

    @OneToMany(targetEntity = Nutrition.class)
    @JoinColumn(name = "patientID", referencedColumnName = "id")
    private List<Nutrition> nutritionList;

    @OneToMany(targetEntity = PressurePosition.class)
    @JoinColumn(name = "patientID", referencedColumnName = "id")
    private List<PressurePosition> pressurePositionList;

    @OneToMany(targetEntity = SkinAssessment.class)
    @JoinColumn(name = "patientID", referencedColumnName = "id")
    private List<SkinAssessment> skinAssessmentList;
}
