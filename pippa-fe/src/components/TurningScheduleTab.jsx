import React, { useState } from "react";
import SupineCard from "./SupineCard";
import SideLyingCard from "./SideLyingCard";
import ProneCard from "./ProneCard";

export const TimerContext = React.createContext({ buttonState: "", setButtonState: () => {} });

export default function TurningScheduleTab(props) {

  const [buttonState, setButtonState] = React.useState("")

  function timerStartParent(timerData){
    console.log(timerData.buttonState);
    setButtonState(timerData.buttonState)
    setButtonState((state) => {
      return state;
    })
  } 

  return (
    <div>
      {console.log()}
      <TimerContext.Provider value={{buttonState, setButtonState}}>
        <SupineCard patientID = {props.patientID}/>
        <SideLyingCard patientID = {props.patientID}/>
        <ProneCard patientID = {props.patientID}/>
      </TimerContext.Provider>
    </div>
  );
}

