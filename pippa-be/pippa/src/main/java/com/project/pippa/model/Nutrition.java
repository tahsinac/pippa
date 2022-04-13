package com.project.pippa.model;

import lombok.*;

import javax.persistence.*;
import javax.persistence.criteria.CriteriaBuilder;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter
@Entity
@Table(name = "NUTRITION")
public class Nutrition {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer nutritionRecordID;

    private Integer patientID;

    private Integer breakfast;

    private Integer lunch;

    private Integer dinner;

    private Integer water;
}
