import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { Stack } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TimerSupine from "./TimerSupine";
import { SERVER_URL } from "../constants.js";
import axios from "axios";


export default function SupineCard(props){

  const [painPoint, setPainPoint] = React.useState("");
  const [hours, setHours] = React.useState("");
  const [buttonState, setButtonState] = React.useState("");
  const [supineButtonState, setSupineButtonState] = React.useState(false);
  const [lastPosRecId, setLastPosRecId] = React.useState(0);

  const handlePainPointChange = (event) => {
    setPainPoint(event.target.value);
  };

  const handleHoursChange = (event) => {
    setHours(event.target.value);
  };

    const sendButtonStateDown = (context) => {
    setButtonState(context.buttonState)
  }

  useEffect(() => {
    fetch(`${SERVER_URL}patients/${props.patientID}`)
      .then((response) => response.json())
      .then((data) => {
      const lastPosIdx = data.pressurePositionList.length - 1
      setLastPosRecId(data.pressurePositionList[lastPosIdx].positionRecordID + 1)
      })
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = () => {
    var currentdate = new Date(); 
      const newPoint = {
        positionRecordID: lastPosRecId,
	      pointName: painPoint,
	      reportedDate: currentdate.getDate() + "/" + (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear(),
      };
      axios
        .post(`${SERVER_URL}pressure-point`, newPoint)
        .then((response) => console.log(response))
  };

  return (
    <div>
      <Container sx={{ p: 2 }}>
        <Grid container spacing={1}>
          <Grid item xs={10} sm={20} md={40}>
            <Card width="50" margin="auto">
              <CardContent>
                <CardMedia
                  component="img"
                  image="images/supine.jpg"
                  alt="Supine"
                  style={{
                    height: "40%",
                    width: "40%",
                    paddingBottom: "0%",
                    paddingLeft: "29%",
                  }}
                />
              </CardContent>
              <CardContent>
                <CardActions>
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-end"
                  >
                    <TimerSupine>
                    </TimerSupine>
                    <Stack direction="row" spacing={1}>
                      <FormControl sx={{ minWidth: 200 }}>
                        <InputLabel id="demo-simple-select-label">
                          Pain Points
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={painPoint}
                          label="Pain Points"
                          onChange={handlePainPointChange}
                        >
                          <MenuItem value="Heels">Heels</MenuItem>
                          <MenuItem value="Sacrum">Sacrum</MenuItem>
                          <MenuItem value="Head">Head</MenuItem>
                          <MenuItem value="Spine">Spine</MenuItem>
                          <MenuItem value="Elbow">Elbow</MenuItem>
                          <MenuItem value="Scapulae">Scapulae</MenuItem>
                          <MenuItem value="Back of Head">Back of Head</MenuItem>
                        </Select>
                      </FormControl>
                      <Button variant="outlined" size="large" onClick={handleSubmit}>
                        Submit
                      </Button>
                    </Stack>
                  </Grid>
                </CardActions>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
