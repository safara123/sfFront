import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import InputLabel from '@mui/material/InputLabel';
import Alert from '@mui/material/Alert';
import axios from "axios";
import NativeSelect from '@mui/material/NativeSelect';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import { Closets, Shulters } from "../../../../services/Data";
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';


const { REACT_APP_API_ENDPOINT } = process.env;


const CreateFilePage = () => {
    const [fileName, setFileName] = useState("");
    const [color, setColor] = useState("");
    const [attachment, setAttachment] = useState("");
    const [allDrawers, setAllDrawers] = useState(null);
    const [drawerId, setDrawerId] = useState("null");
    const [closet, setCloset] = useState("I");
    const [shulter, setShulter] = useState("a");
    const [folderId, setFolderId] = useState();
    const [foldersList, setFoldersList] = useState();
    const user = useSelector((state) => state.userSlice.user);
    const [alert, setAlert] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (drawerId != "null") {
        axios
            .get(`${REACT_APP_API_ENDPOINT}/${user.role}/getAllFolders?drawerId=${drawerId}`,
                {
                    headers: {
                        "x-access-token": user.token,
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((data) => {
                setFoldersList(data.data);
            })
            .catch((err) => { });
        }
    }, [drawerId])


    const onSubmit = () => {
        axios
            .post(
                `${REACT_APP_API_ENDPOINT}/${user.role}/createFile`,
                {
                    fileName: fileName,
                    folderId: folderId,
                    color: color,
                    attachment: attachment
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
                setAllDrawers(data.data);
            })
            .catch((err) => { });
    }, [closet, shulter])

    return (
        <>
            <Container maxWidth="lg" sx={{ mt: 18, mb: 18 }} >
                <TextField id="filName" label="File name" variant="standard" style={{ width: '100%', marginBottom: '3%' }}
                    onChange={(e) => setFileName(e.target.value)} />
                <TextField id="color" label="Color" variant="standard" style={{ width: '100%', marginBottom: '3%' }}
                    onChange={(e) => setColor(e.target.value)} />
                <TextField id="attachment" label="Attachment" variant="standard" style={{ width: '100%', marginBottom: '3%' }}
                    onChange={(e) => setAttachment(e.target.value)} />
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
                        name: 'Drawer',
                        id: 'Drawer',
                    }}
                    style={{ width: '100%', marginBottom: '3%' }}
                    onClick={(e) => { setDrawerId(e.target.value) }}
                >
                    {allDrawers && allDrawers.map((d) => (
                        <option key={d._id} value={d._id}>{d.name}</option>
                    ))}
                </NativeSelect>
                <InputLabel id="DrawersLabel">
                    Folder
                </InputLabel>

                <NativeSelect
                    defaultValue={30}
                    inputProps={{
                        name: 'Folders',
                        id: 'Folders',
                    }}
                    style={{ width: '100%', marginBottom: '3%' }}
                    onClick={(e) => { setFolderId(e.target.value) }}
                >
                    {foldersList && foldersList.map((folder) => (
                        <option key={folder._id} value={folder?._id}>
                            Closet: {folder?.drawer?.closet}
                            --Shulter: {folder?.drawer?.shulter}
                            -- Drawer: {folder?.drawer?.name}
                            -- Folder: {folder?.folderName}
                        </option>
                    ))}
                </NativeSelect>
                <Button variant="outlined" onClick={() => { onSubmit() }}>Submit</Button>
                {
                    alert &&
                    <Alert style={{ marginTop: '4%' }} severity="success" onClose={() => { setAlert(false) }}>File {fileName} added successfully!</Alert>
                }
                {
                    error &&
                    <Alert style={{ marginTop: '4%' }} severity="error" onClose={() => { setError(false) }}>error</Alert>
                }
            </Container>
        </>
    );
};

export default CreateFilePage;
