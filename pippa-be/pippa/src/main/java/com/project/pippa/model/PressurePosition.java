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
@Table(name = "pressurePosition")
public class PressurePosition {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer positionRecordID;

    private Integer patientID;
    private String positionDescription;
    private String startDate;
    private String startTime;
    private String endDate;
    private String endTime;

    @OneToMany(targetEntity = PressurePoint.class)
    @JoinColumn(name = "positionRecordID", referencedColumnName = "positionRecordID")
    private List<PressurePoint> pressurePointList;
}
