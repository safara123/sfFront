import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import InputLabel from '@mui/material/InputLabel';
import Alert from '@mui/material/Alert';
import axios from "axios";
import NativeSelect from '@mui/material/NativeSelect';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';


const { REACT_APP_API_ENDPOINT } = process.env;


const CreateFilePage = () => {
    const [fileName, setFileName] = useState("");
    const [color, setColor] = useState("");
    const [attachment, setAttachment] = useState("");
    const [folderId, setFolderId] = useState();
    const [foldersList, setFoldersList] = useState();
    const user = useSelector((state) => state.userSlice.user);
    const [alert, setAlert] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        axios
            .get(`${REACT_APP_API_ENDPOINT}/${user.role}/getAllFolders`,
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

    }, [user])


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

    return (
        <>
            <Container maxWidth="lg" sx={{ mt: 18, mb: 18 }} >
                <TextField id="filName" label="File name" variant="standard" style={{ width: '100%', marginBottom: '3%' }}
                    onChange={(e) => setFileName(e.target.value)} />
                <TextField id="color" label="Color" variant="standard" style={{ width: '100%', marginBottom: '3%' }}
                    onChange={(e) => setColor(e.target.value)} />
                <TextField id="attachment" label="Attachment" variant="standard" style={{ width: '100%', marginBottom: '3%' }}
                    onChange={(e) => setAttachment(e.target.value)} />
                <InputLabel id="FoldersLabel">
                    Folders
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
