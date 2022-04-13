DROP DATABASE IF EXISTS pippadb;
CREATE DATABASE pippadb; 
USE pippadb;


DROP TABLE IF EXISTS PATIENT;
CREATE TABLE PATIENT (
	id						integer	not null AUTO_INCREMENT,
	patientName				varchar(45),
    birthDate				varchar(45),
	primary key (id)
);

INSERT INTO PATIENT (id, patientName, birthDate)
VALUES
(1, 'Jane Doe', '1950-02-29'),
(2, 'John Doe', '1959-02-29'),
(3, 'Test Doe', '1973-02-29');

DROP TABLE IF EXISTS theUser;
CREATE TABLE theUser (
	userID					integer	not null AUTO_INCREMENT,
	username				varchar(45),
    thePassword				varchar(45),
    theRole					varchar(45),
	primary key (userID)
);

INSERT INTO theUser (userID, username, thePassword, theRole)
VALUES
(1, 'admin', 'password', 'NURSE'),
(2, 'nurse', 'password', 'NURSE'),
(3, 'patient', 'password', 'PATIENT');

DROP TABLE IF EXISTS NUTRITION;
CREATE TABLE NUTRITION (
	nutritionRecordID			integer	not null AUTO_INCREMENT,
    patientID					integer,
	breakfast					integer,
    lunch						integer,
    dinner						integer,
    water						integer,
	primary key (nutritionRecordID),
	foreign key (patientID) references PATIENT(id)
);


INSERT INTO NUTRITION (nutritionRecordID, patientID, breakfast, lunch, dinner, water)
VALUES
(1, 1, 2, 3, 4, 4),
(2, 2, 4, 1, 1, 2);


DROP TABLE IF EXISTS pressurePosition;
CREATE TABLE pressurePosition (
	positionRecordID			integer	not null AUTO_INCREMENT,
    patientID					integer,
    positionDescription			varchar(45),
	startDate					varchar(60),
	startTime					varchar(60),
	endDate						varchar(60),
    endTime						varchar(60),
    primary key (positionRecordID),
    foreign key (patientID) references PATIENT(id)
    );

    
INSERT INTO pressurePosition (positionRecordID, patientID, positionDescription, startDate, startTime, endDate, endTime)
VALUES
(1, 1, "Supine", "2022-03-01", "8:00AM", "2022-03-01", "10:00AM"),
(2, 1, "Side-Lying", "2022-03-01", "10:00AM", "2022-03-01", "12:00PM"),
(3, 2, "Prone", "2022-03-01", "8:00AM", "2022-03-01", "10:00AM"),
(4, 3, "Side-Lying", "2022-03-01", "10:00AM", "2022-03-01", "12:00PM");

DROP TABLE IF EXISTS pressurePoint;
CREATE TABLE pressurePoint (
	pressurePointID			integer	not null AUTO_INCREMENT,
    positionRecordID		integer,
	pointName				varchar(45),
    reportedDate			varchar(45),
	primary key (pressurePointID),
	foreign key (positionRecordID) references pressurePosition(positionRecordID)
);

INSERT INTO pressurePoint (pressurePointID, positionRecordID, pointName, reportedDate)
VALUES
(1, 1, "Elbow", "2022-03-01"),
(2, 2, "Toes", "2022-03-01");

 
DROP TABLE IF EXISTS skinAssessment;
CREATE TABLE skinAssessment (
	skinAssessmentID			integer	not null AUTO_INCREMENT,
    patientID					integer,
    sensoryPerception			integer,
	moisture					integer,
    mobility					integer,
	nutrition					integer,
	frictionShear	 			integer,
    dateAndTime					varchar(100),
    woundPresent				boolean,
    
    primary key (skinAssessmentID),
    foreign key (patientID) references PATIENT(id)
    );
    
INSERT INTO skinAssessment (skinAssessmentID, patientID, sensoryPerception, moisture, mobility, nutrition, frictionShear, dateAndTime, woundPresent)
VALUES
(1, 1, 2, 2, 2, 2, 2, "03/03/2022 12:02:22" ,false),
(2, 2, 4, 3, 2, 3, 2,"03/02/2022 12:02:22" ,false),
(3, 2, 1, 1, 1, 1, 1,"03/03/2022 12:02:22" ,false),
(4, 1, 5, 5, 5, 5, 5, "03/04/2022 12:02:22" ,false),
(5, 1, 2, 4, 5, 2, 1, "03/05/2022 12:02:22" ,false),
(6, 1, 5, 4, 3, 1, 3, "03/06/2022 12:02:22" ,false),
(7, 1, 1, 1, 1, 2, 3, "03/07/2022 12:02:22" ,false),
(8, 1, 4, 4, 4, 1, 4, "03/08/2022 12:02:22" ,false),
(9, 1, 2, 1, 2, 3, 4, "03/09/2022 12:02:22" ,false),
(10, 1, 3, 3, 3, 3, 1, "03/10/2022 12:02:22" ,false),
(11, 2, 2, 2, 2, 2, 2,"03/04/2022 12:02:22" ,false),
(12, 2, 3, 3, 3, 3, 3,"03/05/2022 12:02:22" ,false),
(13, 2, 4, 4, 4, 4, 4,"03/06/2022 12:02:22" ,false),
(14, 2, 2, 2, 2, 2, 2,"03/07/2022 12:02:22" ,false),
(15, 2, 2, 3, 3, 4, 2,"03/08/2022 12:02:22" ,false),
(16, 2, 3, 3, 3, 3, 3,"03/09/2022 12:02:22" ,false);




DROP TABLE IF EXISTS woundAssessment;
CREATE TABLE woundAssessment (
	woundAssessmentID			integer	not null AUTO_INCREMENT,
    skinAssessmentID			integer,
    location					varchar(60),
	shape						varchar(60),
    depth						double,
    
    primary key (woundAssessmentID),
    foreign key (skinAssessmentID) references skinAssessment(skinAssessmentID)
    );
    
INSERT INTO woundAssessment (woundAssessmentID, skinAssessmentID, location, shape, depth)
VALUES
(1, 1, "Elbow", "Circular", 0.3),
(2, 2, "Knee", "Square", 0.7);