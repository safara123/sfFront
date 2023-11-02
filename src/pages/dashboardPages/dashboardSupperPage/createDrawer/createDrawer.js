import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import NativeSelect from '@mui/material/NativeSelect';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import { Closets, Shulters, Drawers } from "../../../../services/Data";
import './createDrawer.css'
const { REACT_APP_API_ENDPOINT } = process.env;


const CreateDrawerPage = () => {
    const [name, setName] = useState("");
    const [closet, setCloset] = useState("I");
    const [shulter, setShulter] = useState("a");
    const [drawersList, setDrawersList] = useState(null);
    const [drawer, setDrawer] = useState();
    const user = useSelector((state) => state.userSlice.user);
    const [alert, setAlert] = useState(false);
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    const onSubmit = () => {
        if (drawer === "please select a number") {
            setError(true)
        }
        if (isLoading === false && name != '' && drawer != "please select a number") {
            setIsLoading(true);
            axios
                .post(
                    `${REACT_APP_API_ENDPOINT}/${user.role}/createDrawers`,
                    {
                        name: name,
                        shulter: shulter,
                        closet: closet,
                        drawerNumber: drawer
                    },
                    {
                        headers: {
                            "x-access-token": user.token,
                            "Content-Type": "application/json",
                        },
                    }
                )
                .then((response) => {
                    setIsLoading(false);
                    setName("")
                    setAlert(true)
                    window.location.reload();
                })
                .catch((err) => {
                    setIsLoading(false);
                    setName("")
                    setError(true)
                });
        }
    };


    useEffect(() => {
        axios
            .get(`${REACT_APP_API_ENDPOINT}/${user.role}/getAllDrawers?closet=${closet}&shulter=${shulter}`,
                {
                    headers: {
                        "x-access-token": user.token,
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((data) => {
                setDrawersList(data.data);
            })
            .catch((err) => { });
    }, [closet, shulter])

    function includeInList(list, id) {
        if (list != null) {
            for (let i = 0; i < list.length; i++) {
                if (list[i].drawerNumber && list[i].drawerNumber === id)
                    return false;
            }
        }
        return true;
    }


    return (
        <>
            <Container maxWidth="lg" sx={{ mt: 18, mb: 18 }}>
                {isLoading &&
                    <CircularProgress className="loading" />
                }
                <Grid container spacing={2}>
                    <Grid item xs={12} >
                        <TextField id="DrawerName" label="Drawer name" variant="standard" style={{ marginBottom: '3%', width: "100%" }}
                            onChange={(e) => setName(e.target.value)} />
                    </Grid>
                </Grid>
                <InputLabel id="ClosetsLabel">
                    Closets
                </InputLabel>
                <NativeSelect
                    defaultValue={30}
                    inputProps={{
                        name: 'Closets',
                        id: 'Closets',
                    }}
                    style={{ width: '100%', marginBottom: '3%' }}
                    onClick={(e) => { setCloset(e.target.value) }}
                >
                    {Closets && Closets.map((closet) => (
                        <option key={closet.id} value={closet.id}>{closet.id}</option>
                    ))}
                </NativeSelect>
                <InputLabel id="ShultersLabel">
                    Shulters
                </InputLabel>
                <NativeSelect
                    defaultValue={30}
                    inputProps={{
                        name: 'Shulters',
                        id: 'Shulters',
                    }}
                    style={{ width: '100%', marginBottom: '3%' }}
                    onClick={(e) => { setShulter(e.target.value) }}
                >
                    {Shulters && Shulters.map((shulter) => (
                        <option key={shulter.id} value={shulter.id}>{shulter.id}</option>
                    ))}
                </NativeSelect>
                <InputLabel id="DrawersLabel">
                    Drawers
                </InputLabel>
                <NativeSelect
                    defaultValue={30}
                    inputProps={{
                        name: 'Drawers',
                        id: 'Drawers',
                    }}
                    style={{ width: '100%', marginBottom: '3%' }}
                    onClick={(e) => { setDrawer(e.target.value) }}
                >
                    {Drawers && Drawers.map((d) => (
                        includeInList(drawersList, d.id) &&
                        <option key={d.id} value={d.id}>{ }{d.id}</option>
                    ))}
                </NativeSelect>
                <Grid container spacing={2}>
                    <Grid item xs={12} >
                        <Button variant="outlined" onClick={() => { onSubmit() }} >Submit</Button>
                    </Grid>
                </Grid>
                {
                    alert &&
                    <Alert style={{ marginTop: '4%' }} severity="success" onClose={() => { setAlert(false) }}>Drawer added successfully!</Alert>
                }
                {
                    error &&
                    <Alert style={{ marginTop: '4%' }} severity="error" onClose={() => { setError(false) }}>error</Alert>
                }
            </Container>
        </>
    );
};

export default CreateDrawerPage;
