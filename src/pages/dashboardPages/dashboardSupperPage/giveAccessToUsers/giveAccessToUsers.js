import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import InputLabel from '@mui/material/InputLabel';
import NativeSelect from '@mui/material/NativeSelect';
import Alert from '@mui/material/Alert';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Closets, Shulters } from "../../../../services/Data";

const { REACT_APP_API_ENDPOINT } = process.env;


const GiveAccessToUsersPage = () => {
    const [closet, setCloset] = useState("I");
    const [shulter, setShulter] = useState("a");
    const [drawer, setDrawer] = useState();
    const [usersList, setUsersList] = useState();
    const [drawersList, setDrawersList] = useState(null);
    const [filteredUsersList, setFilteredUsersList] = useState();
    const user = useSelector((state) => state.userSlice.user);
    const [alert, setAlert] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        axios
            .get(`${REACT_APP_API_ENDPOINT}/${user.role}/getAllUsers`,
                {
                    headers: {
                        "x-access-token": user.token,
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((data) => {
                setUsersList(data.data);
            })
            .catch((err) => { });
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
                `${REACT_APP_API_ENDPOINT}/${user.role}/addUsersToDrawer`,
                {
                    drawerId: drawer,
                    usersList: filteredUsersList,
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
                {usersList &&
                    <Autocomplete
                        multiple
                        id="tags-standard"
                        options={usersList}
                        getOptionLabel={(option) => option.email}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="standard"
                                label="Give permission to users"
                                placeholder="Add User..."
                            />
                        )}
                        onChange={(event, value) => { convertToUsersListId(value) }
                        }
                        style={{ marginBottom: '3%' }}
                    />
                }
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

export default GiveAccessToUsersPage;
