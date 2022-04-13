import React, { useState, useEffect, useRef } from "react";
import "./styles.css";
import Button from "@mui/material/Button";
import { Stack } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import {useDispatch, useSelector} from 'react-redux';
import axios from "axios";
import { SERVER_URL } from "../constants.js";

const STATUS = {
  STARTED: "Started",
  STOPPED: "Stopped",
};

export default function TimerSupine() {

  const [buttonState, setButtonState] = useState(false);
  const [buttonAltState, setButtonAltState] = useState(buttonState);
  const [hours, setHours] = React.useState("");
  

  const handleHoursChange = (event) => {
    setHours(event.target.value);
  };
  
  
  const initial =
    sessionStorage.getItem("secondsRemainingSupine") === null
      ? 0
      : sessionStorage.getItem("secondsRemainingSupine");

  const [secondsRemainingSupine, setSecondsRemaining] = useState(initial);
  const [status, setStatus] = useState(STATUS.STARTED);

  useEffect(() => {
    sessionStorage.setItem("secondsRemainingSupine", secondsRemainingSupine);
  }, [secondsRemainingSupine]);

  // <---------REDUX------------>

  const dispatch = useDispatch();

  useEffect(() => {
    if (secondsToDisplay >= 0){
      setButtonState(buttonState);
      dispatch({type: 'toggle'});
    }
    // setButtonState(buttonState);
  },[buttonState, dispatch])

  const toggleButton = useSelector(state => state.buttonDisabled)

    useEffect(() => {
    setButtonAltState(toggleButton);
    console.log("REDUX STATE FOR TOGGLE: " + toggleButton)
    setButtonAltState((state) => {
      return state;
    })
  }, [toggleButton])

   //<---------REDUX------------>

  const secondsToDisplay = secondsRemainingSupine % 60;
  const minutesRemainingSupine = (secondsRemainingSupine - secondsToDisplay) / 60;
  const minutesToDisplay = minutesRemainingSupine % 60;
  const hoursToDisplay = (minutesRemainingSupine - minutesToDisplay) / 60;

  const handleStart = () => {
    setSecondsRemaining(0);
    setSecondsRemaining(hours * 1);
    setStatus(STATUS.STARTED);

    if (hours !== "") {
      setButtonState(true);
      setButtonState((state) => {
        return state;
      });
      var currentdate = new Date(); 
      const newPosition = {
        patientID: 1,
        positionDescription: "Supine",
        startDate:  currentdate.getDate() + "/" + (currentdate.getMonth() + 1)  + "/" + currentdate.getFullYear(),
        startTime: currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds(),
        endDate: currentdate.getDate() + "/" + (currentdate.getMonth() + 1)  + "/" + currentdate.getFullYear(),
        endTime: (currentdate.getHours() + hours)+ ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds(),
        pressurePointList: [],
      };
      axios
        .post(`${SERVER_URL}pressure-position`, newPosition)
        .then((response) => console.log(response))
    }
  };

  const handleStop = () => {
    setStatus(STATUS.STOPPED);
  };
  const handleReset = () => {
    setStatus(STATUS.STOPPED);
    //setSecondsRemaining(INITIAL_COUNT)
  };
  useInterval(
    () => {
      if (secondsRemainingSupine > 0) {
        setSecondsRemaining(secondsRemainingSupine - 1);
        setButtonState(true);
      } else if (
        secondsRemainingSupine === 0 &&
        minutesRemainingSupine === 0
      ) { setButtonState(false);
        window.location.reload();
      } else {
        setStatus(STATUS.STOPPED);
      }
    },
    status === STATUS.STARTED ? 1000 : null
    // passing null stops the interval
  );


  return (
    <Stack>
      <Typography variant="h4" textAlign="center" paddingTop="5%">
        {twoDigits(hoursToDisplay)}:{twoDigits(minutesToDisplay)}:
        {twoDigits(secondsToDisplay)}
      </Typography>
      <Stack direction="row" spacing={1}>
        <FormControl sx={{ minWidth: 90 }} disabled={buttonState || toggleButton}>
          <InputLabel id="demo-simple-select-label">Hours</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={hours}
            label="Hours"
            onChange={handleHoursChange}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={7}>7</MenuItem>
            <MenuItem value={8}>8</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="success"
          size="large"
          onClick={handleStart}
          disabled={buttonState || toggleButton}
        >
          {(secondsToDisplay !=0)? `In Progress` : `Start`}
        </Button>
      </Stack>
    </Stack>
  );
}

// source: https://overreacted.io/making-setinterval-declarative-with-react-hooks/
function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

// https://stackoverflow.com/a/2998874/1673761
const twoDigits = (num) => String(num).padStart(2, "0");