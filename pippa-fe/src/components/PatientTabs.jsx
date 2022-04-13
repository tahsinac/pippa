import * as React from "react";
import Tabs from "@mui/material/Tabs";
import { TabContext } from "@mui/lab";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabPanel from "@mui/lab/TabPanel";
import TurningScheduleTab from "./TurningScheduleTab";
import Nutrition from "./Nutrition";
import SkinAssessment from "./SkinAssessment";
import BradenHistory from "./BradenHistory";

export default function PatientTabs(props) {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            onChange={handleChange}
            aria-label="lab API tabs example"
            variant="fullWidth"
          >
            <Tab label="Turning Schedule" value="1" />
            <Tab label="Nutrition / Hydration" value="2" />
            <Tab label="Skin Assessment" value="3" />
            <Tab label="Braden Score History" value="4" />
          </Tabs>
        </Box>
        <TabPanel value="1">
          <TurningScheduleTab patientID={props.patientID} />
        </TabPanel>
        <TabPanel value="2">
          <Nutrition patientID={props.patientID} />
        </TabPanel>
        <TabPanel value="3">
          <SkinAssessment patientID={props.patientID} />
        </TabPanel>
        <TabPanel value="4">
        <BradenHistory patientID={props.patientID} />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
