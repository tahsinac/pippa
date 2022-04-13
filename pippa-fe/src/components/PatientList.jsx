import React, { useEffect, useState } from "react";
import { SERVER_URL } from "../constants.js";
import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom"; //added

export default function PatientList() {
  const [colDefs] = useState([
    { field: "id", headerName: "Patient ID", width: 90, value: "" },
    { field: "patientName", headerName: "Patient Name", width: 150, value: "" },
    { field: "birthDate", headerName: "DOB", width: 120, value: "" },
    { field: "breakfast", headerName: "Last Breakfast", width: 120, value: "" },
    { field: "lunch", headerName: "Last Lunch", width: 100, value: "" },
    { field: "dinner", headerName: "Last Dinner", width: 101, value: "" },
    {
      field: "positionDescription",
      headerName: "Recent Position",
      width: 135,
      value: "",
    },
    {
      field: "sensoryPerception",
      headerName: "Sensory Perception",
      width: 160,
      value: "",
    },
    { field: "moisture", headerName: "Recent Moisture", width: 140, value: "" },
    { field: "mobility", headerName: "Recent Mobility", width: 130, value: "" },
    {
      field: "nutrition",
      headerName: "Recent Nutrition",
      width: 130,
      value: "",
    },
    {
      field: "frictionShear",
      headerName: "Recent Friction Shear",
      width: 175,
      value: "",
    },
    {
      field: "woundPresent",
      headerName: "Wound Present",
      width: 175,
      value: "",
    },
  ]);

  const [rowData, setRowData] = useState([]);

  const [data, setData] = useState("");

  const [selectedPatient, setSelectedPatient] = useState([]);


  //<--- Added object here --->
  const nutritionDefault = {
    breakfast: "N/A",
    lunch: "N/A",
    dinner: "N/A",
  };

  const skinAssessmentDefault = {
    sensoryPerception: "N/A",
    moisture: "N/A",
    mobility: "N/A",
    nutrition: "N/A",
    frictionShear: "N/A",
    woundPresent: false,
  }

  useEffect(() => {
    (async () => {
      fetch(SERVER_URL + "patients/latest")
        .then((response) => response.json().then(console.log(response.text)))
        //<----Addded Filter Here --->
        .then((data) =>
          data.filter((element) => {
            if (element.nutritionList === null) {
              console.log(element);

              //<--- Added element to the Nutrition List--->
              element.nutritionList = [nutritionDefault];
            }
            if( element.skinAssessmentList === null) {
              element.skinAssessmentList = [skinAssessmentDefault]
            }
            console.log(element);
            return data;
          })
        )
        //<--- Regular code continues here--->
        .then((rowData) => {
          const patientData = rowData.map((p) => {
            return {
              id: p.id,
              patientName: p.patientName,
              birthDate: p.birthDate,
              breakfast: p.nutritionList[0].breakfast,
              lunch: p.nutritionList[0].lunch,
              dinner: p.nutritionList[0].dinner,
              positionDescription: p.pressurePositionList[0].positionDescription,
              sensoryPerception: p.skinAssessmentList[0].sensoryPerception,
              moisture: p.skinAssessmentList[0].moisture,
              mobility: p.skinAssessmentList[0].mobility,
              nutrition: p.skinAssessmentList[0].nutrition,
              frictionShear: p.skinAssessmentList[0].frictionShear,
              woundPresent: p.skinAssessmentList[0].woundPresent ? "Yes" : "No",
            };
          });
          setRowData(patientData);
        })
        .catch((err) => console.error(err));
    })();
  }, [selectedPatient]);

  return (
    <div style={{ height: 700, width: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1, m: 1 }}>
        <Button
          component={Link}
          to={{ pathname: "/patient-profile", state: { data } }}
          variant="contained"
          color="secondary"
          sx={{ m: 1 }}
        >
          Select Patient
        </Button>
        <Button
          component={Link}
          to="/users/new"
          variant="contained"
          color="success"
          sx={{ m: 1 }}
          disabled= "true"
        >
          Add New Patient
        </Button>{" "}

      </Box>
      <DataGrid
        columns={colDefs}
        rows={rowData}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        disableSelectionOnClick
        onSelectionModelChange={(ids) => {
          const selectedIDs = new Set(ids);
          const selectedRowData = rowData.filter((row) =>
            selectedIDs.has(row.id)
          );
          setData(selectedRowData);
        }}
      />
    </div>
  );
}
