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
import TimerProne from "./TimerProne";
import { SERVER_URL } from "../constants.js";
import axios from "axios";

export default function ProneCard(props) {

  const [painPoint, setPainPoint] = React.useState("");
  const [hours, setHours] = React.useState("");
  const [buttonState, setButtonState] = React.useState("")
  const [lastPosRecId, setLastPosRecId] = React.useState(0);


  const handlePainPointChange = (event) => {
    setPainPoint(event.target.value);
  };
  const handleHoursChange = (event) => {
    setHours(event.target.value);
  };

  function proneTimerStart(timerData){
    setButtonState(timerData.buttonState)
    setButtonState((state) => {
      return state;
    })
    props.onProneTimerStart({
      buttonState,
    });
  }

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
                  image="images/prone.jpeg"
                  alt="Prone Position"
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
                    <TimerProne 
                    />
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
                          <MenuItem value="Toes">Toes</MenuItem>
                          <MenuItem value="Knees">Knees</MenuItem>
                          <MenuItem value="Genitalia (males)">Genitalia (males)</MenuItem>
                          <MenuItem value="Anterior superior spinous processes">
                            Anterior superior spinous processes
                          </MenuItem>
                          <MenuItem value="Breasts (women)">Breasts (women)</MenuItem>
                          <MenuItem value="Acromion process">Acromion process</MenuItem>
                          <MenuItem value="Cheek and ear">Cheek and ear</MenuItem>
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
