import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import LockResetIcon from '@mui/icons-material/LockReset';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ClearIcon from '@mui/icons-material/Clear';
import './viewUsers.css';

const { REACT_APP_API_ENDPOINT } = process.env;

const ViewUsersSupperPage = (props) => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.userSlice.user);
    const [allUsers, setAllUsersState] = useState();
    const setLoading = props.setLoading;
    const loading = props.loading;
    const [alert, setAlert] = useState(false);
    const [passAlert, setPassAlert] = useState(false);
    const [openDelete, openDeleteStatus] = useState(false);
    const [userToDelete, userSelected] = useState('');
    const [userNameToDelete, userNameToDeleteSelected] = useState('');
    const [openChangePassword, openChangePasswordStatus] = useState(false);
    const [userToChange, userToChangeSelected] = useState('');
    const [userNameToChange, userNameToChangeSelected] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const usersTitleList = [
        {
            key: "Name"
        },
        {
            key: "Email"
        },
        {
            key: "Role"
        },
        {
            key: "Delete"
        },
        {
            key: "Reset"
        },
        {
            key: "Add permission"
        }
        ];

    useEffect(() => {
        window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
        setLoading(true);
        axios
            .get(
                `${REACT_APP_API_ENDPOINT}/${user.role}/getAllUsers`,
                {
                    headers: {
                        "x-access-token": user.token,
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((response) => {
                setAllUsersState(response.data);
                setLoading(false);
            })
            .catch((err) => {
            });
    }, [REACT_APP_API_ENDPOINT, !alert]);

    const deleteUser = (userId) => {
        setLoading(true);
        axios
            .post(
                `${REACT_APP_API_ENDPOINT}/${user.role}/deleteUser`,
                {
                    userId: userId
                },
                {
                    headers: {
                        "x-access-token": user.token,
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((response) => {
                setAlert(true);
                setLoading(false)
                openDeleteStatus(false);
            })
            .catch((err) => {
                setAlert(false);
                setLoading(false)
            });
    }

    const changePassword = (userId, newPass) => {
        setLoading(true);
        axios
            .post(
                `${REACT_APP_API_ENDPOINT}/${user.role}/changePassword`,
                {
                    userId: userId,
                    password: newPass,
                },
                {
                    headers: {
                        "x-access-token": user.token,
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((response) => {
                setPassAlert(true);
                setLoading(false)
                openChangePasswordStatus(false);
            })
            .catch((err) => {
                setAlert(false);
                setPassAlert(false)
            });
    }
    const goToEditPermission = (userId, username) => {
        navigate("/singleUserAccess?id="+ userId + "&name="+ username);

    }


    return (
        <div className="usersTableStyle">
            <Popover
                open={openDelete}
                anchorPosition={{ top: 200, left: 800 }}
                anchorOrigin={{
                    vertical: 'left',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'center',
                    horizontal: 'center',
                }}
                style={{ padding: '5%' }}
            >
                <ClearIcon style={{ margin: '5%', cursor: 'pointer' }} onClick={() => {
                    openDeleteStatus(false)
                    userSelected('')
                }} />

                <p className="textPopup" style={{ padding: '10%'}}>
                    user {userNameToDelete} will be deleted permanently!
                </p>
                <div style={{ textAlign: 'center' }}>
                    <Button variant="contained" color="error" style={{ width: '70%', marginBottom: '10%', marginTop: '10%' }}
                        startIcon={<DeleteForeverIcon />}
                        onClick={() => {
                            deleteUser(userToDelete);
                        }}
                    >
                        Delete
                    </Button>
                </div>
            </Popover>


            <Popover
                open={openChangePassword}
                anchorPosition={{ top: 0, left: 0 }}
                anchorOrigin={{
                    vertical: 'left',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'center',
                    horizontal: 'center',
                }}
                style={{ padding: '5%' }}
            >
                <ClearIcon style={{ margin: '5%', cursor: 'pointer' }} onClick={() => {
                    openChangePasswordStatus(false)
                    userToChangeSelected('')
                }} />

                <p className="textPopup" style={{ padding: '10%'}}>
                    Reset password for {userNameToChange}
                </p>
                <div style={{ textAlign: 'center' }}>
                    <TextField id="changePassword" label="password..." variant="standard" style={{ marginBottom: '3%', width: "70%" }}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>
                <div style={{ textAlign: 'center' }}>
                    <Button variant="contained" color="success" style={{ width: '70%', marginBottom: '10%', marginTop: '10%' }}
                        startIcon={<LockResetIcon />}
                        onClick={() => {
                            changePassword(userToChange, newPassword);
                        }}
                    >
                        Reset
                    </Button>
                </div>
            </Popover>

            {
                alert &&
                <Alert style={{ marginTop: '4%' }} severity="success" onClose={() => { setAlert(false) }}>user deleted successfully!</Alert>
            }
            {
                passAlert &&
                <Alert style={{ marginTop: '4%' }} severity="success" onClose={() => { setPassAlert(false) }}>Reset password successfully!</Alert>
            }

            {
                allUsers &&
                <>
                    <Grid item xs={2}>
                        {<Typography variant="h4" gutterBottom>
                            Users
                        </Typography>
                        }
                    </Grid>
                    <Table size="small" stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {usersTitleList.map((row) => (
                                    <TableCell key={row.key}>{row.key}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {allUsers.map((row) => (
                                <TableRow style={{ cursor: 'pointer', position: 'relative' }} className='TableRow' key={row._id}>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.email}</TableCell>
                                    <TableCell>{row.rol}</TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="error" style={{ width: '100%', marginBottom: '10%', marginTop: '10%' }}
                                            startIcon={<DeleteForeverIcon />}
                                            onClick={() => {
                                                openDeleteStatus(true)
                                                userSelected(row._id);
                                                userNameToDeleteSelected(row.name)
                                            }}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="success" style={{ width: '100%', marginBottom: '10%', marginTop: '10%' }}
                                            startIcon={<LockResetIcon />}
                                            onClick={() => {
                                                openChangePasswordStatus(true)
                                                userToChangeSelected(row._id);
                                                userNameToChangeSelected(row.name)
                                            }}
                                        >
                                            Reset
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="primary" style={{ width:'100%', marginBottom: '1%', marginTop: '1%', fontSize:'70%', whiteSpace:'nowrap' }}
                                            onClick={() => {
                                                window.open("/singleUserAccess?id="+ row._id + "&name="+ row.name,'_blank')
                                            }}
                                        >
                                            Add Permission
                                        </Button>
                                        <Button variant="contained" color="error" style={{  width:'100%', marginBottom: '1%', marginTop: '1%', fontSize:'70%', whiteSpace:'nowrap' }}
                                            startIcon={<DeleteForeverIcon />}
                                            onClick={() => {
                                                window.open("/deleteSingleUserAccess?id="+ row._id + "&name="+ row.name,'_blank')
                                            }}
                                        >
                                            Delete Permission
                                        </Button>

                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>

                    </Table>

                    {/* {
                        alert && isOut && status === 2 &&
                        <Alert style={{ marginTop: '4%' }} severity="success" onClose={() => { setAlert(false) }}>Folder Out!</Alert>
                    }
                    {
                        alert && isOut && status === 3 &&
                        <Alert style={{ marginTop: '4%' }} severity="success" onClose={() => { setAlert(false) }}>File Out!</Alert>
                    }
                    {
                        alert && isIn && status === 2 &&
                        <Alert style={{ marginTop: '4%' }} severity="success" onClose={() => { setAlert(false) }}>Folder In!</Alert>
                    }
                    {
                        alert && isIn && status === 3 &&
                        <Alert style={{ marginTop: '4%' }} severity="success" onClose={() => { setAlert(false) }}>File In!</Alert>
                    }
                    {
                        error &&
                        <Alert style={{ marginTop: '4%' }} severity="error" onClose={() => { setError(false) }}>error</Alert>
                    } */}

                </>
            }
        </div>
    );
};

export default ViewUsersSupperPage;
