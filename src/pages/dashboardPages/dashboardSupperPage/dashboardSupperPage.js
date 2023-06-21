import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import axios from "axios";
import { makeStyles } from "@mui/styles";
import Pagination from "@mui/material/Pagination";
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { logout } from "../../../reducers/userSlice.js";
import Table from "../../../components/Table";
import VisibilityIcon from '@mui/icons-material/Visibility';
import SideNav from '../../../components/SideNav';
import CreateFolderPage from "./createFolder/createFolder"
import CreateFilePage from "./createFile/createFile"
import CreateUserPage from "./createUser/createUser"
import CreateDrawerPage from "./createDrawer/createDrawer"
import GiveAccessToUsersPage from "./giveAccessToUsers/giveAccessToUsers"
import ViewUsersSupperPage from "./viewUsers/viewUsers.js";
import './dashboard.css';

const { REACT_APP_API_ENDPOINT } = process.env;

const useStyles = makeStyles(() => ({
    ul: {
        "& .MuiPaginationItem-root": {
            color: "#fff",
        },
    },
}));

const DashboardSupperPage = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.userSlice.user);
    const classes = useStyles();
    const [allDrawers, setAllDrawersState] = useState([]);
    const [allFolders, setAllFoldersState] = useState([]);
    const [allFiles, setElements] = useState([]);
    const [files, setFiles] = useState([]);
    const [page, setPage] = useState(1);
    const [pageData, setPageData] = useState(1);
    const [count, setCount] = useState(0);
    const [pageDataFolders, setPageDataFolders] = useState(1);
    const [countFolders, setCountFolders] = useState(0);
    const [pageDataFiles, setPageDataFiles] = useState(1);
    const [countFiles, setCountFiles] = useState(0);
    const dispatch = useDispatch();
    const pageSize = 6;
    const pageSizeFolder = 6;
    const pageSizeFile = 6;
    const [searchTerm, setSearchTerm] = useState(false);
    const [drawerSearch, setDrawerSearch] = useState(false);
    const [folderSearch, setFolderSearch] = useState(false);
    const [fileSearch, setFileSearch] = useState(false);
    const [status, setStatus] = useState(1);
    const [loading, setLoading] = useState(false);
    const [reloading, setReloading] = useState(false);
    const [reloadingFolder, setReloadingFolder] = useState(false);
    const [reloadingFile, setReloadingFile] = useState(false);
    const [drawerName, setDrawerName] = useState(null);
    const [drawerId, setDrawerId] = useState(null);
    const [folderId, setFolderId] = useState(null);


    const drawersTitleList = [
        {
            key: "drawer number"
        },
        {
            key: ""
        },

        {
            key: "title"
        },
        {
            key: ""
        },
        {
            key: "closet"
        },
        {
            key: "shulter"
        }
    ];

    const foldersTitleList = [
        {
            key: "title"
        },
        {
            key: ""
        },
        {
            key: "drawer"
        },
        {
            key: "drawer number"
        },
        ,
        {
            key: "firstDateIn"
        },
        {
            key: "firstDateOut"
        },
        {
            key: "lastDateIn"
        },
        {
            key: "lastDateOut"
        },
        {
            key: "check"
        }
    ];

    const filesTitleList = [
        {
            key: "title"
        },
        {
            key: ""
        },
        {
            key: "color"
        },
        {
            key: "folderId"
        },
        {
            key: "firstDateIn"
        },
        {
            key: "firstDateOut"
        },
        {
            key: "lastDateIn"
        },
        {
            key: "lastDateOut"
        },
        {
            key: "check"
        }
    ];
    useEffect(() => {
        if (!user) {
            navigate("/");
            return;
        }
    }, [])

    useEffect(() => {
        window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
        if (drawerSearch === "" || drawerSearch === false) {
            setLoading(true);

            axios
                .get(
                    `${REACT_APP_API_ENDPOINT}/${user.role}/getDrawersPagination?size=${pageSize}&page=${pageData}`,
                    {
                        headers: {
                            "x-access-token": user.token,
                            "Content-Type": "application/json",
                        },
                    }
                )
                .then((response) => {
                    setAllDrawersState(response.data.drawers);
                    setCount(response.data.count);
                    setLoading(false);
                })
                .catch((err) => {
                    dispatch(logout());
                    navigate("/");
                });
        }
        if (drawerSearch !== false && drawerSearch !== "") {
            setLoading(true);
            const delayDebounceFn = setTimeout(() => {
                axios
                    .get(
                        `${REACT_APP_API_ENDPOINT}/${user.role}/searchDrawers?drawerName=${drawerSearch}&size=${pageSize}&page=${pageData}`,
                        {
                            headers: {
                                "x-access-token": user.token,
                                "Content-Type": "application/json",
                            },
                        }
                    )
                    .then((response) => {
                        setAllDrawersState(response.data.drawers);
                        setCount(response.data.count);
                        setLoading(false);
                    });
            }, 1000);
            return () => clearTimeout(delayDebounceFn);
        }
    }, [REACT_APP_API_ENDPOINT, pageData, drawerSearch, reloading]);



    useEffect(() => {
        window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
        if ((folderSearch === "" || folderSearch === false) && drawerId) {
            setLoading(true);
            axios
                .get(
                    `${REACT_APP_API_ENDPOINT}/${user.role}/getFoldersPagination?drawerId=${drawerId}&size=${pageSizeFolder}&page=${pageDataFolders}`,
                    {
                        headers: {
                            "x-access-token": user.token,
                            "Content-Type": "application/json",
                        },
                    }
                )
                .then((response) => {
                    setElements(response.data.folder);
                    setCountFolders(response.data.count);
                    setLoading(false);
                })
                .catch((err) => {
                    dispatch(logout());
                    navigate("/");
                });
        }

        if (folderSearch !== false && folderSearch !== "" && drawerId) {
            setLoading(true);
            const delayDebounceFn = setTimeout(() => {
                axios
                    .get(
                        `${REACT_APP_API_ENDPOINT}/${user.role}/searchFolders?drawerId=${drawerId}&folderName=${folderSearch}&size=${pageSizeFolder}&page=${pageDataFolders}`,
                        {
                            headers: {
                                "x-access-token": user.token,
                                "Content-Type": "application/json",
                            },
                        }
                    )
                    .then((response) => {
                        setElements(response.data.folders);
                        setCountFolders(response.data.count);
                        setLoading(false);
                    });
            }, 1000);
            return () => clearTimeout(delayDebounceFn);
        }
    }, [REACT_APP_API_ENDPOINT, folderSearch, pageDataFolders, drawerId, reloadingFolder]);


    useEffect(() => {
        window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth",
        });

        if ((fileSearch === "" || fileSearch === false) && folderId) {
            setLoading(true);
            axios
                .get(
                    `${REACT_APP_API_ENDPOINT}/${user.role}/getFilesPagination?folderId=${folderId}&size=${pageSizeFile}&page=${pageDataFiles}`,
                    {
                        headers: {
                            "x-access-token": user.token,
                            "Content-Type": "application/json",
                        },
                    }
                )
                .then((response) => {
                    setFiles(response.data.file);
                    setCountFiles(response.data.count);
                    setLoading(false);
                })
                .catch((err) => {
                });
        }

        if (fileSearch !== false && fileSearch !== "" && folderId) {
            setLoading(true);
            const delayDebounceFn = setTimeout(() => {
                axios
                    .get(
                        `${REACT_APP_API_ENDPOINT}/${user.role}/searchFiles?fileName=${fileSearch}&folderId=${folderId}&size=${pageSizeFile}&page=${pageDataFiles}`,
                        {
                            headers: {
                                "x-access-token": user.token,
                                "Content-Type": "application/json",
                            },
                        }
                    )
                    .then((response) => {
                        setFiles(response.data.files);
                        setCountFiles(response.data.count);
                        setLoading(false);
                    });
            }, 1000);
            return () => clearTimeout(delayDebounceFn);
        }
    }, [REACT_APP_API_ENDPOINT, fileSearch, pageDataFiles, folderId, reloadingFile]);

    const onPageChange = (event, value) => {
        setPageData(value);
    };

    const onPageFoldersChange = (event, value) => {
        setPageDataFolders(value);
    };
    const onPageFilesChange = (event, value) => {
        setPageDataFiles(value);
    };


    return (
        <>
            {loading &&
                <CircularProgress className="loading" />
            }
            <Box sx={{ display: 'flex' }} className={loading ? "isLoadingStyle" : ""}>
                <CssBaseline />
                <SideNav page={page} setPage={setPage} />
                {
                    page === 1 && <Container maxWidth="lg" sx={{ mt: 18, mb: 18 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>

                                <Paper style={{ width: '100%' }} sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                    {<div className="seeButtons">
                                        <Button variant="contained" color="primary"
                                            onClick={() => {
                                                setStatus(2);
                                                setDrawerId("folders");
                                            }}
                                        >
                                            See All Folder
                                            <VisibilityIcon />
                                        </Button>
                                        <Button variant="contained" color="primary"
                                            onClick={() => {
                                                setStatus(3);
                                                setFolderId("files");
                                            }}
                                        >
                                            See All Files
                                            <VisibilityIcon />
                                        </Button>
                                    </div>}

                                    {
                                        status === 1 && <Table eventsList={allDrawers} eventsTitleList={drawersTitleList} viewFolders={true} status={status} setStatus={setStatus} setElements={setElements} drawerName={drawerName} setDrawerName={setDrawerName} loading={loading} setLoading={setLoading} setDrawerSearch={setDrawerSearch} drawerSearch={drawerSearch} setFolderSearch={setFolderSearch} folderSearch={folderSearch} drawerId={drawerId} folderId={folderId} setDrawerId={setDrawerId} setFolderId={setFolderId} fileSearch={fileSearch} setFileSearch={setFileSearch} setReloading={setReloading} reloading={reloading} setReloadingFolder={setReloadingFolder} setReloadingFile={setReloadingFile} />
                                    }
                                    {
                                        status === 2 && <Table eventsList={allFiles} eventsTitleList={foldersTitleList} viewFolders={true} status={status} setStatus={setStatus} setElements={setElements} drawerName={drawerName} setDrawerName={setDrawerName} loading={loading} setLoading={setLoading} setDrawerSearch={setDrawerSearch} drawerSearch={drawerSearch} setFolderSearch={setFolderSearch} folderSearch={folderSearch} drawerId={drawerId} folderId={folderId} setDrawerId={setDrawerId} setFolderId={setFolderId} fileSearch={fileSearch} setFileSearch={setFileSearch} setReloading={setReloading} reloading={reloading} setReloadingFolder={setReloadingFolder} setReloadingFile={setReloadingFile} />
                                    }
                                    {
                                        status === 3 && <Table eventsList={files} eventsTitleList={filesTitleList} viewFolders={true} status={status} setStatus={setStatus} setElements={setElements} drawerName={drawerName} setDrawerName={setDrawerName} loading={loading} setLoading={setLoading} setDrawerSearch={setDrawerSearch} drawerSearch={drawerSearch} setFolderSearch={setFolderSearch} folderSearch={folderSearch} drawerId={drawerId} folderId={folderId} setDrawerId={setDrawerId} setFolderId={setFolderId} fileSearch={fileSearch} setFileSearch={setFileSearch} setReloading={setReloading} reloading={reloading} setReloadingFolder={setReloadingFolder} setReloadingFile={setReloadingFile} />
                                    }
                                </Paper>
                            </Grid>
                        </Grid>
                        {
                            status == 1 && user && user.role != 'user' && <Pagination
                                shape="rounded"
                                classes={{ ul: classes.ul }}
                                count={Math.ceil(count / pageSize)}
                                showFirstButton
                                showLastButton
                                color="primary"
                                onChange={onPageChange}
                                style={{ backgroundColor: 'gray' }}
                            />
                        }

                        {
                            status == 2 && <Pagination
                                shape="rounded"
                                classes={{ ul: classes.ul }}
                                count={Math.ceil(countFolders / 6)}
                                showFirstButton
                                showLastButton
                                color="primary"
                                onChange={onPageFoldersChange}
                                style={{ backgroundColor: 'gray' }}
                            />
                        }

                        {
                            status == 3 && <Pagination
                                shape="rounded"
                                classes={{ ul: classes.ul }}
                                count={Math.ceil(countFiles / 6)}
                                showFirstButton
                                showLastButton
                                color="primary"
                                onChange={onPageFilesChange}
                                style={{ backgroundColor: 'gray' }}
                            />
                        }


                    </Container>
                }
                {
                    page === 2 && <CreateUserPage />
                }
                {
                    page === 3 && <CreateDrawerPage />
                }
                {
                    page === 4 && <CreateFolderPage />
                }
                {
                    page === 5 && <CreateFilePage />
                }
                {
                    page === 6 && <GiveAccessToUsersPage />
                }
                {
                    page === 7 && <ViewUsersSupperPage loading={loading} setLoading={setLoading} />
                }

            </Box>
        </>
    );
};

export default DashboardSupperPage;
