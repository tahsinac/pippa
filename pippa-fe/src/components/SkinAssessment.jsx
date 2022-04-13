import React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import axios from 'axios';
import swal from 'sweetalert';
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { SERVER_URL } from "../constants.js";

const label = { inputProps: { 'aria-label': 'Switch demo' } };

export default function SkinAssessment(props) {

    const [checked, setChecked] = React.useState(false);
    const [woundStatus, setWoundStatus] = React.useState(true);
    const [sensory, setSensory] = React.useState();
    const [moisture, setMoisture] = React.useState();
    const [mobility, setMobility] = React.useState();
    const [nutrition, setNutrition] = React.useState();
    const [fiction, setFiction] = React.useState();
    const [location, setLocation] = React.useState();
    const [shape, setShape] = React.useState();
    const [depth, setDepth] = React.useState();
    const patientID = props.patientID;
    // const patientID = 3
    var error = null;

    function handleSwitch(e) {
        e.preventDefault();
        if (checked) {
            setChecked(false);
            setWoundStatus(true);
        } else {
            setChecked(true);
            setWoundStatus(false);
        }

    };

    function handleSubmit(e) {

        e.preventDefault();

        if ((!sensory) || (isNaN(sensory))) {

            error = "Please Enter Number for Sensory Perception";
            swal(error, "", "error");

        } else if ((!moisture) || (isNaN(moisture))) {

            error = "Please Enter Number for Moisture";
            swal(error, "", "error");

        } else if ((!mobility) || (isNaN(mobility))) {

            error = "Please Enter Number for Mobility";
            swal(error, "", "error");

        } else if ((!nutrition) || (isNaN(nutrition))) {

            error = "Please Enter Number for Nutrition";
            swal(error, "", "error");

        }
        else if ((!fiction) || (isNaN(fiction))) {

            error = "Please Enter Number for Fiction and Sheer";
            swal(error, "", "error");

        }
        else if ((!woundStatus) && (!location)) {

            error = "Please Enter Location";
            swal(error, "", "error");

        } else if ((!woundStatus) && (!shape)) {

            error = "Please Enter Shape";
            swal(error, "", "error");

        } else if ((!woundStatus) && ((!depth) || (isNaN(depth)))) {

            error = "Please Enter Number for Depth";
            swal(error, "", "error");

        }
        else {
            let currentdate= new Date();
            const sendSkinData = {
                patientID: parseInt(patientID),
                dateAndTime: currentdate.getDate()+ "/"+(currentdate.getMonth() + 1) + "/" + currentdate.getFullYear()+ ' ' + currentdate.getHours()+ ":"+currentdate.getMinutes() + ":" + currentdate.getSeconds() ,
                sensory: parseInt(sensory),
                moisture: parseInt(moisture),
                mobility: parseInt(mobility),
                nutrition: parseInt(nutrition),
                fiction: parseInt(fiction),
                woundPresent: !woundStatus
            }
            console.log(sendSkinData)
            axios.post(`${SERVER_URL}skin-assessment`, sendSkinData)
                .then(res => {
                    console.log(res)
                    if (res.status == 201 || res.status == 200) {
                        if (woundStatus) {
                            swal("The Skin Assessment Successfully Added.", "", "success")
                                .then(function () {
                                    window.location.reload()
                                    // setWoundStatus(true);
                                    // setSensory("");
                                    // setMoisture("");
                                    // setMobility("");
                                    // setNutrition("");
                                    // setFiction("");
                                });
                        }
                    }
                })

            if (!woundStatus) {
                const sendWoundData = {
                    skinAssessmentID: 0,
                    location: location,
                    shape: shape,
                    depth: parseFloat(depth),
                }
                console.log(sendWoundData)
                axios.post(`${SERVER_URL}wound-assessment`, sendWoundData)
                    .then(res => {
                        console.log(res)
                        if (res.status == 201 || res.status == 200) {
                            console.log("***")
                            swal("The Skin Assessment Successfully Added.", "", "success")
                                .then(function () {
                                    window.location.reload()
                                    // setWoundStatus(true);
                                    // setSensory("");
                                    // setMoisture("");
                                    // setMobility("");
                                    // setNutrition("");
                                    // setFiction("");
                                    // setLocation("");
                                    // setShape("");
                                    // setDepth("");
                                });
                        }
                    })
            }
        }
    }
    return (
        <div>
            <Container sx={{ borderLeft: 1, borderBottom: 1, borderRight: 1, borderColor: "divider" }} style={{
                margin: 'auto',
                paddingTop: 50,
                padding: "auto",
            }}>
                <Grid container spacing={1} style={{
                    margin: 'auto',
                    minWidth: "50%",
                    paddingLeft: "35%",
                }}>
                    <FormControl>
                        <Typography gutterBottom variant="h6" component="div">
                            Braden Scale
                        </Typography>
                        <Grid container spacing={2} style={{
                            padding: 10
                        }}>
                            <Grid item xs={8} >
                                <Typography gutterBottom variant="h7" component="div">
                                    Sensory Perception
                                </Typography>
                            </Grid>
                            <Grid item xs={4} >
                                <Select
                                    sx={{ minWidth: 200 }}
                                    onChange={e => setSensory(e.target.value)}
                                    value={sensory}
                                >
                                    <MenuItem value={1}>1. Completely Limited Unresponsive</MenuItem>
                                    <MenuItem value={2}>2. Very Limited</MenuItem>
                                    <MenuItem value={3}>3. Slightly Limited</MenuItem>
                                    <MenuItem value={4}>4. No Impairment</MenuItem>
                                </Select>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} style={{
                            padding: 10
                        }}>
                            <Grid item xs={8} >
                                <Typography gutterBottom variant="h7" component="div">
                                    Moisture
                                </Typography>
                            </Grid>
                            <Grid item xs={4} >
                                <Select
                                    sx={{ minWidth: 200 }}
                                    onChange={e => setMoisture(e.target.value)}
                                    value={moisture}
                                >
                                    <MenuItem value={1}>1. Constantly Moist </MenuItem>
                                    <MenuItem value={2}>2.Very Moist</MenuItem>
                                    <MenuItem value={3}>3. Occasionally Moist</MenuItem>
                                    <MenuItem value={4}>4. Rarely Moist</MenuItem>
                                </Select>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} style={{
                            padding: 10
                        }}>
                            <Grid item xs={8} >
                                <Typography gutterBottom variant="h7" component="div">
                                    Mobility
                                </Typography>
                            </Grid>
                            <Grid item xs={4} >
                                <Select
                                    sx={{ minWidth: 200 }}
                                    onChange={e => setMobility(e.target.value)}
                                    value={mobility}
                                >
                                    <MenuItem value={1}>1. COMPLETELY IMMOBILE</MenuItem>
                                    <MenuItem value={2}>2. Very Limited</MenuItem>
                                    <MenuItem value={3}>3. Slightly Limited</MenuItem>
                                    <MenuItem value={4}>4. No Impairment</MenuItem>
                                </Select>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} style={{
                            padding: 10
                        }}>
                            <Grid item xs={8} >
                                <Typography gutterBottom variant="h7" component="div">
                                    Nutrition
                                </Typography>
                            </Grid>
                            <Grid item xs={4} >
                                <Select
                                    sx={{ minWidth: 200 }}
                                    onChange={e => setNutrition(e.target.value)}
                                    value={nutrition}
                                >
                                    <MenuItem value={1}>1. Very Poor</MenuItem>
                                    <MenuItem value={2}>2. Probably Inadequate</MenuItem>
                                    <MenuItem value={3}>3. Adequate</MenuItem>
                                    <MenuItem value={4}>4. Excellent</MenuItem>
                                </Select>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} style={{
                            padding: 10
                        }}>
                            <Grid item xs={8} >
                                <Typography gutterBottom variant="h7" component="div">
                                    Fiction and Sheer
                                </Typography>
                            </Grid>
                            <Grid item xs={4} >
                                <Select
                                    sx={{ minWidth: 200 }}
                                    onChange={e => setFiction(e.target.value)}
                                    value={fiction}
                                >
                                    <MenuItem value={1}>1. Problem</MenuItem>
                                    <MenuItem value={2}>2. Occupational Therapistential Problem</MenuItem>
                                    <MenuItem value={3}>3. No Apparent Problem</MenuItem>
                                </Select>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} style={{
                            padding: 10
                        }}>
                            <Grid item xs={8} >
                                <Typography gutterBottom variant="h7" component="div">
                                    Wound Present
                                </Typography>
                            </Grid>
                            <Grid item xs={4} >
                                <Switch {...label} checked={checked} onChange={handleSwitch} />
                            </Grid>
                        </Grid>

                        <Typography gutterBottom variant="h6" component="div">
                            Wound Assessment
                        </Typography>

                        <Grid container spacing={2} style={{
                            padding: 10
                        }}>
                            <Grid item xs={8} >
                                <Typography gutterBottom variant="h7" component="div">
                                    Location
                                </Typography>
                            </Grid>
                            <Grid item xs={4} >
                                <TextField disabled={woundStatus} onChange={e => setLocation(e.target.value)} id="outlined-basic" label="Location" variant="outlined" size="small" />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} style={{
                            padding: 10
                        }}>
                            <Grid item xs={8} >
                                <Typography gutterBottom variant="h7" component="div">
                                    Shape
                                </Typography>
                            </Grid>
                            <Grid item xs={4} >
                                <TextField disabled={woundStatus} onChange={e => setShape(e.target.value)} id="outlined-basic" label="Shape" variant="outlined" size="small" />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} style={{
                            padding: 10
                        }}>
                            <Grid item xs={8} >
                                <Typography gutterBottom variant="h7" component="div">
                                    Depth
                                </Typography>
                            </Grid>
                            <Grid item xs={4} >
                                <TextField disabled={woundStatus} onChange={e => setDepth(e.target.value)} id="outlined-basic" label="Depth" variant="outlined" size="small" />
                            </Grid>
                        </Grid>
                        <Grid item xs={12} style={{
                            paddingTop: 20,
                            paddingLeft: "35%",
                            marginBottom: 30
                        }} >
                            <Button variant="contained" size="large" onClick={handleSubmit}>
                                Submit
                            </Button>
                        </Grid>
                    </FormControl>
                </Grid>ّ

            </Container>
        </div>
    )
}