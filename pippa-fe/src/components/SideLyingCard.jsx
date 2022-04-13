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
import TimerSideLying from "./TimerSideLying";
import { SERVER_URL } from "../constants.js";
import axios from "axios";

export default function SideLyingCard(props) {
  
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

  //<---------REDUX------------>

  // const toggleButton = useSelector(state => state.buttonDisabled)

  // useEffect(() => {
  //   setButtonState(toggleButton);
  //   console.log("REDUX STATE FOR TOGGLE: " + toggleButton)
  //   setButtonState((state) => {
  //     return state;
  //   })
  // }, [toggleButton])

   //<---------REDUX------------>


  return (
    <div>
      <Container sx={{ p: 2 }}>
        <Grid container spacing={1}>
          <Grid item xs={10} sm={20} md={40}>
            <Card width="50" margin="auto">
              <CardContent>
                <CardMedia
                  component="img"
                  image="images/side-lying.jpg"
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
                    <TimerSideLying
                    >
                    </TimerSideLying>
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
                          <MenuItem value="Malleolus">Malleolus</MenuItem>
                          <MenuItem value="Medial and Lateral Condyles">
                            Medial and Lateral Condyles
                          </MenuItem>
                          <MenuItem value="Greater Trochanter">Greater Trochanter</MenuItem>
                          <MenuItem value="Lilac Crest">Lilac Crest</MenuItem>
                          <MenuItem value="Ribs">Ribs</MenuItem>
                          <MenuItem value="Acromion Process">Acromion Process</MenuItem>
                          <MenuItem value="Ear">Ear</MenuItem>
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
