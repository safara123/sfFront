import React, { useState, useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { useSelector } from "react-redux";
import TableCell from '@mui/material/TableCell';
import axios from "axios";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import TextField from '@mui/material/TextField';
import AttachmentIcon from '@mui/icons-material/Attachment';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import TableHead from '@mui/material/TableHead';
import EditIcon from '@mui/icons-material/Edit';
import Popover from '@mui/material/Popover';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ClearIcon from '@mui/icons-material/Clear';
import Aos from "aos";
import "aos/dist/aos.css";
import TableRow from '@mui/material/TableRow';
import CircularProgress from '@mui/material/CircularProgress';
import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined';
import './style.css';
import { color } from "@mui/system";

const { REACT_APP_API_ENDPOINT } = process.env;

export default function Orders(props) {
  const viewFolders = props.viewFolders;
  const eventsTitleList = props.eventsTitleList;
  const drawerName = props.drawerName;
  const setDrawerId = props.setDrawerId;
  const drawerId = props.drawerId;
  const folderId = props.folderId;
  const loading = props.loading;
  const setLoading = props.setLoading;
  const setDrawerName = props.setDrawerName;
  const setStatus = props.setStatus;
  const status = props.status;
  const fileSearch = props.fileSearch;
  const setReloading = props.setReloading;
  const setReloadingFolder = props.setReloadingFolder;
  const setReloadingFile = props.setReloadingFile;
  const reloading = props.reloading;
  const setFileSearch = props.setFileSearch;
  const setFolderId = props.setFolderId
  const getFilesByFolderId = props.getFilesByFolderId;
  const setElements = props.setElements;
  const setDrawerSearch = props.setDrawerSearch;
  const drawerSearch = props.drawerSearch;
  const setFolderSearch = props.setFolderSearch;
  const folderSearch = props.folderSearch;
  const user = useSelector((state) => state.userSlice.user);
  const [editDrawer, setEditDrawerName] = useState("");
  const [editFolderNameStatus, setEditFolderName] = useState("");
  const [editFileNameStatus, setEditFileName] = useState("");
  const [alert, setAlert] = useState(false);
  const [error, setError] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editFolder, setEditFolder] = useState(false);
  const [editFile, setEditFile] = useState(false);
  const [isOut, setIsOut] = useState(false);
  const [isIn, setIsIn] = useState(false);
  const [openDelete, openDeleteStatus] = useState(false);
  const [folderAlert, setFolderAlert] = useState(false);
  const [folderToDelete, folderSelected] = useState('');
  const [folderNameToDelete, folderNameToDeleteSelected] = useState('');
  const [openFileDelete, openFileDeleteStatus] = useState(false);
  const [fileAlert, setFileAlert] = useState(false);
  const [fileToDelete, fileSelected] = useState('');
  const [fileNameToDelete, fileNameToDeleteSelected] = useState('');
  const [openDrawerDelete, openDrawerDeleteStatus] = useState(false);
  const [drawerAlert, setDrawerAlert] = useState(false);
  const [drawerToDelete, drawerSelected] = useState('');
  const [drawerNameToDelete, drawerNameToDeleteSelected] = useState('');


  function formatDate(string) {
    var options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return new Date(string).toLocaleDateString([], options);
  }

  function includeInList(list, id) {
    for (let i = 0; i < list.length; i++) {
      if (list[i]._id === id)
        return true;
    }
    return false;
  }
  useState(() => {
    Aos.init({ duration: 2000 });
  }, []);


  const outFolder = (id, user) => {
    setLoading(true);
    axios
      .post(
        `${REACT_APP_API_ENDPOINT}/${user.role}/outFolder`,
        {
          folderId: id
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
        setIsOut(true);
        setIsIn(false);
        setError(false);
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
        setAlert(false);
      });
  };
  const outFile = (id, user) => {
    setLoading(true);
    axios
      .post(
        `${REACT_APP_API_ENDPOINT}/${user.role}/outFile`,
        {
          fileId: id
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
        setIsOut(true);
        setIsIn(false);
        setError(false);
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
        setAlert(false);
      });

  };
  const inFolder = (id, user) => {
    setLoading(true);
    axios
      .post(
        `${REACT_APP_API_ENDPOINT}/${user.role}/inFolder`,
        {
          folderId: id
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
        setIsOut(false);
        setIsIn(true);
        setError(false);
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
        setAlert(false);
      });


  };
  const inFile = (id, user) => {
    setLoading(true);
    axios
      .post(
        `${REACT_APP_API_ENDPOINT}/${user.role}/inFile`,
        {
          fileId: id
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
        setIsOut(false);
        setIsIn(true);
        setError(false);
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
        setAlert(false);
      });
  };


  const deleteFolder = (folderId) => {
    setLoading(true);
    setReloadingFolder(false);
    axios
      .post(
        `${REACT_APP_API_ENDPOINT}/${user.role}/deleteFolder`,
        {
          folderId: folderId
        },
        {
          headers: {
            "x-access-token": user.token,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setFolderAlert(true);
        setLoading(false)
        openDeleteStatus(false);
        setReloadingFolder(true);
      })
      .catch((err) => {
        setFolderAlert(false);
        setLoading(false)
      });
  }


  const deleteDrawer = (drawerId) => {
    setLoading(true);
    setReloading(false);
    axios
      .post(
        `${REACT_APP_API_ENDPOINT}/${user.role}/deleteDrawer`,
        {
          drawerId: drawerId
        },
        {
          headers: {
            "x-access-token": user.token,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setDrawerAlert(true);
        setLoading(false)
        openDrawerDeleteStatus(false);
        setReloading(true);
      })
      .catch((err) => {
        setDrawerAlert(false);
        setLoading(false)
      });
  }

  const deleteFile = (fileId) => {
    setLoading(true);
    setReloadingFile(false);
    axios
      .post(
        `${REACT_APP_API_ENDPOINT}/${user.role}/deleteFile`,
        {
          fileId: fileId
        },
        {
          headers: {
            "x-access-token": user.token,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setFileAlert(true);
        setLoading(false)
        openFileDeleteStatus(false);
        setReloadingFile(true);
      })
      .catch((err) => {
        setFileAlert(false);
        setLoading(false)
      });
  }

  const editDrawerName = (drawerIdForName) => {
    setReloading(false);
    axios
      .post(
        `${REACT_APP_API_ENDPOINT}/${user.role}/editDrawerName`,
        {
          name: editDrawer,
          drawerId: drawerIdForName,
        },
        {
          headers: {
            "x-access-token": user.token,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setReloading(true);
        setEdit(false)
      })
      .catch((err) => {
      });
  }


  const editFolderName = (folderIdForName) => {
    setReloadingFolder(false);
    axios
      .post(
        `${REACT_APP_API_ENDPOINT}/${user.role}/editFolderName`,
        {
          name: editFolderNameStatus,
          folderId: folderIdForName,
        },
        {
          headers: {
            "x-access-token": user.token,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setReloadingFolder(true);
        setEditFolder(false)
      })
      .catch((err) => {
      });
  }

  const editFileName = (fileIdForName) => {
    setReloadingFile(false);
    axios
      .post(
        `${REACT_APP_API_ENDPOINT}/${user.role}/editFileName`,
        {
          name: editFileNameStatus,
          fileId: fileIdForName,
        },
        {
          headers: {
            "x-access-token": user.token,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setReloadingFile(true);
        setEditFile(false)
      })
      .catch((err) => {
      });
  }


  return (
    <div className={loading ? "isLoadingStyle" : ""}>
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
          folderSelected('')
        }} />

        <p className="textPopup" style={{ padding: '10%' }}>
          folder {folderNameToDelete} will be deleted permanently!
        </p>
        <div style={{ textAlign: 'center' }}>
          <Button variant="contained" color="error" style={{ width: '70%', marginBottom: '10%', marginTop: '10%' }}
            startIcon={<DeleteForeverIcon />}
            onClick={() => {
              deleteFolder(folderToDelete);
            }}
          >
            Delete
          </Button>
        </div>
      </Popover>

      <Popover
        open={openDrawerDelete}
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
          openDrawerDeleteStatus(false)
          drawerSelected('')
        }} />

        <p className="textPopup" style={{ padding: '10%' }}>
          folder {drawerNameToDelete} will be deleted permanently!
        </p>
        <div style={{ textAlign: 'center' }}>
          <Button variant="contained" color="error" style={{ width: '70%', marginBottom: '10%', marginTop: '10%' }}
            startIcon={<DeleteForeverIcon />}
            onClick={() => {
              deleteDrawer(drawerToDelete);
            }}
          >
            Delete
          </Button>
        </div>
      </Popover>

      <Popover
        open={openFileDelete}
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
          openFileDeleteStatus(false)
          fileSelected('')
        }} />

        <p className="textPopup" style={{ padding: '10%' }}>
          file {fileNameToDelete} will be deleted permanently!
        </p>
        <div style={{ textAlign: 'center' }}>
          <Button variant="contained" color="error" style={{ width: '70%', marginBottom: '10%', marginTop: '10%' }}
            startIcon={<DeleteForeverIcon />}
            onClick={() => {
              deleteFile(fileToDelete);
            }}
          >
            Delete
          </Button>
        </div>
      </Popover>

      <Grid container spacing={2}>
        {(status === 2 || status === 3) && !loading &&
          <Grid item xs={1}>
            <BackspaceOutlinedIcon className='TableRow' style={{ cursor: 'pointer' }} onClick={() => {
              if (folderId != "files" && drawerId != "folders") {
                if (status === 2) {
                  setStatus(1);
                }
                else {
                  if (status === 3) {
                    setStatus(2);
                  }
                }
              }
              else {
                if (folderId === "files" || drawerId === "folders") {
                  setStatus(1);
                }
              }
            }} />

          </Grid>
        }
        <Grid item xs={2}>
          {status === 1 && <Typography variant="h4" gutterBottom>
            Drawers
          </Typography>
          }
          {status === 2 && <Typography variant="h4" gutterBottom>
            Folders
          </Typography>
          }
          {status === 3 && <Typography variant="h4" gutterBottom>
            Files
          </Typography>
          }
        </Grid>
        <Grid item xs={9}>
          {status === 1 &&
            <TextField id="SearchDrawer" label="Search for a drawer..." variant="standard" style={{ marginBottom: '3%', width: "100%" }}
              value={drawerSearch ? drawerSearch : ""}
              onChange={(e) => setDrawerSearch(e.target.value)}
            />
          }
          {status === 2 &&
            <TextField id="SearchFolder" label="Search for a folder..." variant="standard" style={{ marginBottom: '3%', width: "100%" }}
              value={folderSearch ? folderSearch : ""}
              onChange={(e) => setFolderSearch(e.target.value)}
            />
          }
          {status === 3 &&
            <TextField id="SearchFile" label="Search for a file..." variant="standard" style={{ marginBottom: '3%', width: "100%" }}
              value={fileSearch ? fileSearch : ""}
              onChange={(e) => setFileSearch(e.target.value)}
            />
          }

          {/* {status === 2 &&
            <TextField id="SearchFolder" label="Search for a folder" variant="standard" style={{ marginBottom: '3%', width: "100%" }} />
          }
          {status === 3 &&
            <TextField id="SearchFile" label="Search for a file" variant="standard" style={{ marginBottom: '3%', width: "100%" }} />
          } */}
        </Grid>
      </Grid>
      {loading &&
        <CircularProgress className="loading" />
      }

      <Table size="small" className={loading ? "isLoadingTableStyle" : ""}>
        <TableHead>
          <TableRow>
            {props.eventsTitleList.map((row) => (
              <TableCell key={row.key}>{row.key}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {status === 1 && !loading && props.eventsList.map((row) => (
            // (user.role != "user" || includeInList(row.usersList, user.id)) &&
            <TableRow style={{ cursor: 'pointer', position: 'relative' }} className='TableRow' key={row._id}>
              {/* <TableCell>{row._id}</TableCell> */}
              <TableCell onClick={() => {
                setDrawerId(row._id);
                setDrawerName(row.name);
                setStatus(2);
              }}>{row?.drawerNumber}
              </TableCell>
              {!edit && <TableCell onClick={() => {
                setDrawerId(row._id);
                setDrawerName(row.name);
                setStatus(2);
              }}
                data-aos="fade-right"
                style={{ width: '20%' }}
              >
                {row.name}
              </TableCell>
              }
              {edit && <TableCell data-aos="fade-left"
              >
                <TextField id="drawerIdForName" label="Edit drawer name" variant="standard" style={{ width: '100%' }}
                  onChange={(e) => setEditDrawerName(e.target.value)}
                />
              </TableCell>
              }
              {!edit && <TableCell>
                <EditIcon onClick={() => { setEdit(true) }} />
              </TableCell>
              }
              {edit && <TableCell>
                <CheckCircleOutlineIcon onClick={() => { editDrawerName(row._id) }} />
              </TableCell>
              }

              {/* <TableCell>
                <EditIcon />
              </TableCell> */}
              <TableCell onClick={() => {
                setDrawerId(row._id);
                setDrawerName(row.name);
                setStatus(2);
              }}>{row.closet}</TableCell>
              <TableCell onClick={() => {
                setDrawerId(row._id);
                setDrawerName(row.name);
                setStatus(2);
              }}>{row.shulter}</TableCell>
              {
                user.role != "user" &&
                <div style={{ textAlign: 'end' }}>
                  <DeleteForeverIcon
                    style={{ color: 'red' }}
                    onClick={() => {
                      openDrawerDeleteStatus(true)
                      drawerSelected(row._id);
                      drawerNameToDeleteSelected(row.name)
                    }}
                  />
                </div>}
            </TableRow>
          ))}

          {status === 2 && !loading && props.eventsList.map((row) => (
            <TableRow style={{ cursor: 'pointer', position: 'relative' }} className='TableRow' key={row._id}>
              {/* <TableCell>{row._id}</TableCell> */}
              {!editFolder &&
                <TableCell onClick={() => {
                  setFolderId(row._id);
                  setStatus(3);
                }}
                  data-aos="fade-right"
                  style={{ width: '10%' }}>
                  {row?.folderName}</TableCell>
              }
              {editFolder && <TableCell data-aos="fade-left"
              >
                <TextField id="folderIdForName" label="Edit folder name" variant="standard" style={{ width: '100%' }}
                  onChange={(e) => setEditFolderName(e.target.value)}
                />
              </TableCell>
              }
              {!editFolder && <TableCell>
                <EditIcon onClick={() => { setEditFolder(true) }} />
              </TableCell>
              }
              {editFolder && <TableCell>
                <CheckCircleOutlineIcon onClick={() => { editFolderName(row._id) }} />
              </TableCell>
              }


              <TableCell onClick={() => {
                setFolderId(row._id);
                setStatus(3);
              }}>{row?.drawer?.name}</TableCell>
              <TableCell onClick={() => {
                setFolderId(row._id);
                setStatus(3);
              }}>{row?.drawer?.drawerNumber}</TableCell>
              <TableCell onClick={() => {
                setFolderId(row._id);
                setStatus(3);
              }}>
                {row.firstDateIn && formatDate(row.firstDateIn)}
                <p style={{ color: 'red' }}>
                  by: {row.firstDateInUser?.name && row.firstDateInUser?.name}
                </p>
              </TableCell>
              <TableCell onClick={() => {
                setFolderId(row._id);
                setStatus(3);
              }}>
                {row.firstDateOut && formatDate(row.firstDateOut)}
                <p style={{ color: 'red' }}>
                  by: {row.firstDateOutUser?.name && row.firstDateOutUser?.name}
                </p>
              </TableCell>
              <TableCell onClick={() => {
                setFolderId(row._id);
                setStatus(3);
              }}>
                {row.lastDateIn && formatDate(row.lastDateIn)}
                <p style={{ color: 'red' }}>
                  by: {row.lastDateInUser?.name && row.lastDateInUser?.name}
                </p>
              </TableCell>
              <TableCell onClick={() => {
                setFolderId(row._id);
                setStatus(3);
              }}>
                {row.lastDateOut && formatDate(row.lastDateOut)}
                <p style={{ color: 'red' }}>
                  by: {row.lastDateOutUser?.name && row.lastDateOutUser?.name}
                </p>
              </TableCell>
              <div style={{ textAlign: 'end' }}>
                <DeleteForeverIcon
                  style={{ color: 'red' }}
                  onClick={() => {
                    openDeleteStatus(true)
                    folderSelected(row._id);
                    folderNameToDeleteSelected(row.folderName)
                  }}
                />
              </div>
              <Button variant="contained" color="success" style={{ width: '100%', marginBottom: '10%', marginTop: '10%', }}
                onClick={() => { inFolder(row._id, user); }}
              >
                In
                <DownloadIcon />
              </Button>
              <Button variant="outlined" color="error" style={{ width: '100%', marginBottom: '10%', marginTop: '10%' }}
                onClick={() => { outFolder(row._id, user) }}
              >
                Out
                <UploadIcon />
              </Button>

            </TableRow>
          ))}
          {status === 3 && !loading && props.eventsList.map((row) => (
            <TableRow className='TableRow' key={row._id} style={{ cursor: "pointer" }}>
              {/* <TableCell>{row._id}</TableCell> */}

              {!editFile &&
                <TableCell
                  data-aos="fade-right"
                  style={{ width: '10%' }}>
                  {row?.fileName}</TableCell>
              }
              {editFile && <TableCell data-aos="fade-left"
              >
                <TextField id="fileIdForName" label="Edit file name" variant="standard" style={{ width: '100%' }}
                  onChange={(e) => setEditFileName(e.target.value)}
                />
              </TableCell>
              }
              {!editFile && <TableCell>
                <EditIcon onClick={() => { setEditFile(true) }} />
              </TableCell>
              }
              {editFile && <TableCell>
                <CheckCircleOutlineIcon onClick={() => { editFileName(row._id) }} />
              </TableCell>
              }

              <TableCell>{row?.color}</TableCell>
              <TableCell>{row?.folderId?.folderName}</TableCell>
              <TableCell>
                {row.firstDateIn && formatDate(row.firstDateIn)}
                <p style={{ color: 'red' }}>
                  by: {row.firstDateInUser?.name && row.firstDateInUser?.name}
                </p>
              </TableCell>
              <TableCell>
                {row.firstDateOut && formatDate(row.firstDateOut)}
                <p style={{ color: 'red' }}>
                  by: {row.firstDateOutUser?.name && row.firstDateOutUser?.name}
                </p>
              </TableCell>
              <TableCell>
                {row.lastDateIn && formatDate(row.lastDateIn)}
                <p style={{ color: 'red' }}>
                  by: {row.lastDateInUser?.name && row.lastDateInUser?.name}
                </p>
              </TableCell>
              <TableCell>
                {row.lastDateOut && formatDate(row.lastDateOut)}
                <p style={{ color: 'red' }}>
                  by: {row.lastDateOutUser?.name && row.lastDateOutUser?.name}
                </p>
              </TableCell>
              <div className="attachmentDelete">
                <div className="attachmentDelete">
                  {
                    row.attachment &&
                    <AttachmentIcon />
                  }
                  {
                    row.attachment &&
                    <a href={row?.attachment} target="_blank" style={{ fontSize: '70%' }}>ATTACHMENT</a>
                  }
                </div>
                <div>
                  <DeleteForeverIcon
                    style={{ color: 'red' }}
                    onClick={() => {
                      openFileDeleteStatus(true)
                      fileSelected(row._id);
                      fileNameToDeleteSelected(row.fileName)
                    }}
                  />
                </div>
              </div>
              <Button variant="contained" color="success" style={{ width: '100%', marginBottom: '10%', marginTop: '10%' }}
                startIcon={<DownloadIcon />}
                onClick={() => { inFile(row._id, user) }}>
                In
              </Button>
              <Button variant="outlined" color="error" style={{ width: '100%', marginBottom: '10%', marginTop: '10%' }}
                startIcon={<UploadIcon />}
                onClick={() => { outFile(row._id, user) }}>
                Out
              </Button>
            </TableRow>
          ))}
        </TableBody>

      </Table>
      {
        folderAlert && status === 2 &&
        <Alert style={{ marginTop: '4%' }} severity="success" onClose={() => { setFolderAlert(false) }}>Folder deleted successfully!</Alert>
      }
      {
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
      }

    </div>
  );
}