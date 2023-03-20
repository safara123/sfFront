import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Grid from '@mui/material/Grid';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const { REACT_APP_API_ENDPOINT } = process.env;


const CreateUserPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const user = useSelector((state) => state.userSlice.user);
    const [checked, setChecked] = React.useState(true);
    const [role, setrole] = useState("admin");
    const [alert, setAlert] = useState(false);
    const [error, setError] = useState(false);

    const handleChange = (event) => {
        setChecked(event.target.checked);
        if (!checked)
            setrole("admin")
        else
            setrole("user")
    };

    const onSubmit = () => {
        axios
            .post(
                `${REACT_APP_API_ENDPOINT}/${user.role}/register`,
                {
                    name: name,
                    email: email,
                    rol: role,
                    password: password,
                },
                {
                    headers: {
                        "x-access-token": user.token,
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((response) => {
                setAlert(true)
            })
            .catch((err) => {
                setError(true)
            });


    };


    return (
        <>
            <Container maxWidth="lg" sx={{ mt: 18, mb: 18 }} >
                <Grid container spacing={2}>
                    <Grid item xs={12} >
                        <TextField id="UserName" label="User name" variant="standard" style={{ marginBottom: '3%', width: "100%" }}
                            onChange={(e) => setName(e.target.value)} />
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12}>
                        <TextField id="Email" label="Email" variant="standard" style={{ marginBottom: '3%', width: "100%" }}
                            onChange={(e) => setEmail(e.target.value)} />
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12}>
                        <TextField id="Password" label="Password" variant="standard" style={{ marginBottom: '3%', width: "100%" }}
                            onChange={(e) => setPassword(e.target.value)} />
                    </Grid>
                </Grid>
                {
                    user && user.role === "supperadmin" &&
                    <FormControlLabel
                        style={{ marginBottom: '3%' }}
                        control={
                            <Switch
                                checked={checked}
                                onChange={handleChange}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />}
                        label={role}
                    />
                }                <Grid container spacing={2}>
                    <Grid item xs={12} >
                        <Button variant="outlined" onClick={() => { onSubmit() }} >Submit</Button>
                    </Grid>
                </Grid>
                {
                    alert &&
                    <Alert style={{ marginTop: '4%' }} severity="success" onClose={() => { setAlert(false) }}>{role} added successfully!</Alert>
                }
                {
                    error &&
                    <Alert style={{ marginTop: '4%' }} severity="error" onClose={() => { setError(false) }}>error</Alert>
                }
            </Container>
        </>
    );
};

export default CreateUserPage;
