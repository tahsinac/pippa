import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { Box, Stack } from "@mui/material";
import PatientTabs from "./PatientTabs";
import { SERVER_URL } from "../constants.js";
import { useLocation } from "react-router-dom"

export default function PatientProfile() {
  const [name, setName] = useState([]);
  const [braden, setBraden] = useState("N/A");
  const location = useLocation();
  const currentPatient = location.state.data[0].id;
  localStorage.setItem('patientID', currentPatient);

  useEffect(() => {
    fetch(`${SERVER_URL}patients/${currentPatient}`)
      .then((response) => response.json())
      .then((data) => {
        setName(data.patientName);
        const skinAssessmentList =
          data.skinAssessmentList[data.skinAssessmentList.length - 1];
        const score =
          skinAssessmentList.sensoryPerception +
          skinAssessmentList.moisture +
          skinAssessmentList.mobility +
          skinAssessmentList.frictionShear;
        setBraden(score);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          p: 1,
          m: 1,
          bgcolor: "background.paper",
        }}
      >
        <Stack spacing={0.01}>
          <Typography variant="h4" component="div" sx={{ letterSpacing: 3 }}>
            {name}
          </Typography>
          <Typography variant="body1" component="div">
            {`Braden Score: ${braden}`}
          </Typography>
          <Typography variant="subtitle2" component="div" fontWeight= "bold" fontStyle= "italic">
            {(() => {
              if (braden >= 15) {
                return "AT RISK";
              } else if (braden >= 13 && braden <= 14) {
                return "MODERATE RISK";
              } else if (braden >= 10 && braden <= 12) {
                return "HIGH RISK";
              } else if (braden <= 9) {
                return "HIGH RISK";
              } else {
                return "";
              }
            })()}
          </Typography>
        </Stack>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          p: 1,
          m: 1,
          bgcolor: "background.paper",
        }}
      >
        <PatientTabs patientID = {currentPatient}/>
      </Box>
    </div>
  );
}
