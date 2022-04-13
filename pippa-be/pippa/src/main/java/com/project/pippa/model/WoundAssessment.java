package com.project.pippa.model;

import lombok.*;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "woundAssessment")
public class WoundAssessment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer woundAssessmentID;

    private Integer skinAssessmentID;
    private String location;
    private String shape;
    private Double depth;
}
