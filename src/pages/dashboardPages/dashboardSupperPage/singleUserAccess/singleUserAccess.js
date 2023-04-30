import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import InputLabel from '@mui/material/InputLabel';
import NativeSelect from '@mui/material/NativeSelect';
import Alert from '@mui/material/Alert';
import { useNavigate } from "react-router-dom";
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Closets, Shulters } from "../../../../services/Data";
import './singleUserAccess.css'
const { REACT_APP_API_ENDPOINT } = process.env;


const SingleUserAccessPage = () => {
    const navigate = useNavigate();
    const [closet, setCloset] = useState("I");
    const [shulter, setShulter] = useState("a");
    const [drawer, setDrawer] = useState();
    const [usersList, setUsersList] = useState();
    const [drawersList, setDrawersList] = useState(null);
    const [filteredUsersList, setFilteredUsersList] = useState();
    const user = useSelector((state) => state.userSlice.user);
    const [alert, setAlert] = useState(false);
    const [error, setError] = useState(false);
    const queryParameters = new URLSearchParams(window.location.search)
    const userId = queryParameters.get("id")
    const userName = queryParameters.get("name")

    useEffect(() => {
        if (!user) {
            navigate("/");
            return;
        }
    }, [])

    useEffect(() => {
        setUsersList(userId);
    }, [])

    useEffect(() => {
        axios
            .get(`${REACT_APP_API_ENDPOINT}/${user.role}/getAllDrawers?closet=${closet}&shulter=${shulter}`,
                {
                    headers: {
                        "x-access-token": user.token,
                        "Content-Type": "application/json"
                    }
                }
            )
            .then((data) => {
                setDrawersList(data.data);
            })
            .catch((err) => { });
    }, [closet, shulter])


    const onSubmit = () => {
        axios
            .post(
                `${REACT_APP_API_ENDPOINT}/${user.role}/addOneUserToDrawer`,
                {
                    drawerId: drawer,
                    userId: userId,
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
    const convertToUsersListId = (array) => {
        let tempUsers = [];
        array.forEach(element => {
            tempUsers.push(element._id);
        });
        setFilteredUsersList(tempUsers)
    }
    return (
        <>
            <Container maxWidth="lg" sx={{ mt: 18, mb: 18 }} >
                {usersList &&
                    <div className="yourIdContainer">ADD NEW DRAWER PERMISSION FOR <p style={{color: 'red'}}> {userName} </p></div>
                }
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
                <InputLabel id="ShultersLabel">
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
                    {drawersList && drawersList.map((drawer) => (
                        <option key={drawer._id} value={drawer._id}>{drawer.name}</option>
                    ))}
                </NativeSelect>
                <Button variant="outlined" onClick={() => { onSubmit() }}>Submit</Button>
                {
                    alert &&
                    <Alert style={{ marginTop: '4%' }} severity="success" onClose={() => { setAlert(false) }}>Users have access successfully!</Alert>
                }
                {
                    error &&
                    <Alert style={{ marginTop: '4%' }} severity="error" onClose={() => { setError(false) }}>error</Alert>
                }

            </Container>
        </>
    );
};

export default SingleUserAccessPage;
