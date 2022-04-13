package com.project.pippa.model;

import lombok.*;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "pressurePoint")
public class PressurePoint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer pressurePointID;

    private Integer positionRecordID;
    private String pointName;
    private String reportedDate;
}
