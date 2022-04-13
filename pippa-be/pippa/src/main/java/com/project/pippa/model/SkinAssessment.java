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
@Table(name = "skinAssessment")
public class SkinAssessment {
    //moisture, mobility, nutrition, frictionShear, woundPresent
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer skinAssessmentID;

    private Integer patientID;
    private Integer sensoryPerception;
    private Integer moisture;
    private Integer mobility;
    private Integer nutrition;
    private Integer frictionShear;
    private String dateAndTime;
    private boolean woundPresent;

    @OneToMany(targetEntity = WoundAssessment.class)
    @JoinColumn(name = "skinAssessmentID", referencedColumnName = "skinAssessmentID")
    private List<WoundAssessment> woundAssessmentList;
}