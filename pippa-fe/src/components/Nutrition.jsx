import React, { Component, useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Box from '@mui/material/Box';
import FormControl from "@mui/material/FormControl";
import TextField from '@mui/material/TextField';
import axios from 'axios';
import swal from 'sweetalert';
import { SERVER_URL } from "../constants.js";

export default function Nutrition(props) {


    const [breakfast, setBreakfast] = React.useState();
    const [lunch, setLunch] = React.useState();
    const [dinner, setDinner] = React.useState();
    const [water, setWater] = React.useState();
    const patientID = props.patientID;
    // const patientID = 3
    var error = null;

    function handleSubmit(e) {

        e.preventDefault();
        if ((!breakfast) || (isNaN(breakfast))) {
            error = "Please enter number for breakfast";
            swal(error, "", "error");

        } else if ((!lunch) || (isNaN(lunch))) {

            error = "Please enter number for lunch";
            swal(error, "", "error");

        } else if ((!dinner) || (isNaN(dinner))) {
            error = "Please enter number for dinner";
            swal(error, "", "error");

        } else if ((!water) || (isNaN(water))) {
            error = "Please enter number for water";
            swal(error, "", "error");
        }
        else {
            const sendData = {
                patientID: parseInt(patientID),
                breakfast: parseInt(breakfast),
                lunch: parseInt(lunch),
                dinner: parseInt(dinner),
                water: parseInt(water),
            }
            console.log(sendData)
            axios.post(`${SERVER_URL}nutrition`, sendData)
                .then(res => {
                    console.log(res)
                    if (res.status == 201 || res.status == 200) {
                        swal(" The Nutrition Successfully Added.", "", "success")
                            .then(function () {
                                window.location.reload()
                                // setBreakfast("");
                                // setLunch("");
                                // setDinner("");
                                // setWater("");
                            });
                    }
                })
        }
    }
    return (
        <div>
            <Container sx={{ borderLeft: 1, borderBottom: 1, borderRight: 1, borderColor: "divider" }} style={{
                margin: 'auto',
                paddingTop: 50,
                padding: "auto",
                // background: "#f5fcff"
            }}>
                <Box style={{
                    margin: 'auto',
                    minWidth: "50%",
                    paddingLeft: "38%",
                }}>
                    <Grid container spacing={1}>
                        <FormControl>
                            <Grid container spacing={2} style={{
                                padding: 10
                            }}>
                                <Grid item xs={8} >
                                    <Typography gutterBottom variant="h7" component="div" >
                                        Breakfast Eaten <span style={{
                                color:"#4269f5"
                            }}>%</span>
                                    </Typography>
                                </Grid>
                                <Grid item xs={4} >
                                    <TextField
                                        style={{ width: '150%' }}
                                        onChange={e => setBreakfast(e.target.value)}
                                        InputProps={{
                                            shrink: true,
                                            inputProps: {
                                                max: 100, min: 0
                                            }
                                        }}
                                        id="breakfast-number"
                                        size="small"
                                        type="number"
                                    />
                                </Grid>
                            </Grid>

                            <Grid container spacing={2} style={{
                                padding: 10
                            }}>
                                <Grid item xs={8} >
                                    <Typography gutterBottom variant="h7" component="div">
                                        Lunch Eaten <span style={{
                                color:"#4269f5"
                            }}>%</span>
                                    </Typography>
                                </Grid>
                                <Grid item xs={4} >
                                    <TextField style={{ width: '150%' }}
                                        onChange={e => setLunch(e.target.value)}
                                        InputProps={{
                                            inputProps: {
                                                max: 100, min: 0
                                            }
                                        }}
                                        id="lunch-number"
                                        size="small"
                                        type="number"

                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} style={{
                                // paddingTop: 30,
                                padding: 10
                            }}>
                                <Grid item xs={8} >
                                    <Typography gutterBottom variant="h7" component="div">
                                        Dinner Eaten <span style={{
                                color:"#4269f5"
                            }}>%</span>
                                    </Typography>
                                </Grid>
                                <Grid item xs={4} >
                                    <TextField style={{ width: '150%' }}
                                        onChange={e => setDinner(e.target.value)}
                                        InputProps={{
                                            inputProps: {
                                                max: 100, min: 0
                                            }
                                        }}
                                        id="dinner-number"
                                        size="small"
                                        type="number"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} style={{
                                padding: 10
                            }}>
                                <Grid item xs={8} >
                                    <Typography gutterBottom variant="h7" component="div">
                                        Water drank <span style={{
                                color:"#4269f5"
                            }}>%</span>
                                    </Typography>
                                </Grid>
                                <Grid item xs={4} >
                                    <TextField style={{ width: '150%' }}
                                        onChange={e => setWater(e.target.value)}
                                        InputProps={{
                                            inputProps: {
                                                max: 100, min: 0
                                            }
                                        }}
                                        id="water-number"
                                        size="small"
                                        type="number"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item xs={12} style={{
                                paddingTop: 20,
                                paddingLeft: "30%",
                                marginBottom: 30
                            }} >
                                <Button variant="contained" size="large" onClick={handleSubmit} >
                                    Submit
                                </Button>
                            </Grid>
                        </FormControl>ّ
                    </Grid>
                </Box >
            </Container>
        </div>
    )
}