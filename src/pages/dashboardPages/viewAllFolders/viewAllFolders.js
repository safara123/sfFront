import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Popover from '@mui/material/Popover';
import ClearIcon from '@mui/icons-material/Clear';
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Button from '@mui/material/Button';


const { REACT_APP_API_ENDPOINT } = process.env;


export const ViewAllFoldersPage = () => {
    const [selectedOption, setSelectedOption] = useState(0);
    const user = useSelector((state) => state.userSlice.user);
    const [openDelete, openDeleteStatus] = useState(false);
    const [folderToDelete, folderSelected] = useState('');
    const [isOut, setIsOut] = useState(false);
    const [isIn, setIsIn] = useState(false);
    const [error, setError] = useState(false);
    const [alert, setAlert] = useState(false);
    const [folderNameToDelete, folderNameToDeleteSelected] = useState('');
    const [folderAlert, setFolderAlert] = useState(false);
    const [loading, setLoading] = useState(false);
    const [reLoading, setReloadingFolder] = useState(0);
    const [searchFolder, setSearchFolder] = useState("");


    const [data, setData] = useState([]);

    const [sortField, setSortField] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');
    const [count, setCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [activePage, setActivePage] = useState(1);
    const itemsPerPage = 6;


    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            axios
                .get(
                    `${REACT_APP_API_ENDPOINT}/${user.role}/getFoldersPaginationPage?folderName=${searchFolder}&page=${currentPage}&size=${itemsPerPage}`,
                    {
                        headers: {
                            "x-access-token": user.token,
                            "Content-Type": "application/json",
                        },
                    }
                )
                .then((response) => {
                    setData(response.data.folders)
                    setCount(response.data.count)
                })
                .catch((err) => {
                });
        }, 1000);
        return () => clearTimeout(delayDebounceFn);


    }, [currentPage, reLoading, alert, isOut, isIn, searchFolder]);

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

    // Paginate data
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    return (
        <div className="view-folder-container">
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

            <div className="head-container">

                <h2>Folders List</h2>
            </div>

            <input
                type="text"
                onChange={(e) => { setSearchFolder(e.target.value) }}
                placeholder="Search..."
                className="search-input"
            />
            <div className="table-container">

                {/* pagination */}
                <div className="pagination">
                    {currentPage > 1 && (
                        <button onClick={() => { setCurrentPage(currentPage - 1); setActivePage(currentPage - 1); }}>
                            ‹
                        </button>
                    )}

                    {Array.from({ length: Math.ceil(count / itemsPerPage) }).map((_, index) => {
                        if (currentPage <= index + 3 && currentPage > index - 3) {
                            return (
                                <button
                                    key={index}
                                    onClick={() => { paginate(index + 1); setActivePage(index + 1); }}
                                    className={currentPage === index + 1 ? 'active' : ''}
                                >
                                    {index + 1}
                                </button>
                            );
                        }
                    })}

                    {currentPage < Math.ceil(count / itemsPerPage) && (
                        <button onClick={() => { setCurrentPage(currentPage + 1); setActivePage(currentPage + 1); }}>
                            ›
                        </button>
                    )}
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Drawer Number</th>
                            <th>Drawer Name</th>
                            <th>Closet</th>
                            <th>Shulter</th>
                            <th>firstDateIn</th>
                            <th>firstDateOut</th>
                            <th>lastDateIn</th>
                            <th>lastDateOut</th>
                            <th>check</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((folder, index) => (
                            <tr key={index} onClick={() => { }}>
                                <td>{folder?.folderName}</td>
                                <td>{folder?.drawer?.drawerNumber}</td>
                                <td>{folder?.drawer?.name}</td>
                                <td>{folder?.drawer?.closet}</td>
                                <td>{folder?.drawer?.shulter}</td>
                                <td>{folder?.firstDateInUser?.name}:<br /> {folder?.firstDateIn}</td>
                                <td>{folder?.firstDateOutUser?.name}:<br /> {folder?.firstDateOut}</td>
                                <td>{folder?.lastDateInUser?.name && folder?.lastDateInUser?.name}
                                    {!folder?.lastDateInUser?.name && folder?.firstDateInUser?.name}:
                                    <br /> {folder?.lastDateIn}</td>
                                <td>{folder?.lastDateOutUser?.name}:<br /> {folder?.lastDateOut}</td>
                                <td>
                                    <DeleteForeverIcon
                                        style={{ color: 'red' }}
                                        onClick={() => {
                                            openDeleteStatus(true)
                                            folderSelected(folder._id);
                                            folderNameToDeleteSelected(folder.folderName)
                                        }}
                                    />
                                    <Button className="inoutButton" variant="contained" color="success" style={{ marginBottom: '10%', marginTop: '10%', }}
                                        onClick={() => { inFolder(folder._id, user); }}
                                    >
                                        In
                                        <DownloadIcon className="inoutButton" />
                                    </Button>
                                    <Button className="inoutButton" variant="outlined" color="error" style={{ marginBottom: '10%', marginTop: '10%' }}
                                        onClick={() => { outFolder(folder._id, user) }}
                                    >
                                        Out
                                        <UploadIcon className="inoutButton" />
                                    </Button>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </div>
    );
};


const styles = `
.search-input {
    width: 50%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
    margin-bottom:3%;
}
.view-folder-container {
    display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	justify-content: center;
	align-items: center;
	align-content: stretch;    
    padding:5%;
    font-family:'Courier New', Courier, monospace;

}
.table-container {
    display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	justify-content: center;
	align-items: center;
	align-content: stretch;    
}

table {
    border-collapse: collapse;
    width: 100%;
}

th,
td {
    border: 1px solid #ccc;
    padding: 4px;
    text-align: left;
}

td {
    color: #000000;
}
.inoutButton {
    width:90%;
    font-size:90%
}
th {
    font-size: 100%;
    cursor: pointer;
    background-color: #f2f2f2;
    transition: font-size 1s ease-in-out,
        background-color 1s ease-in-out,
        color 1s ease-in-out;
}


  
@media screen and (max-width: 1068px) {
    .inoutButton {
        width:70%;
        font-size:70%
    }
    th,
    td {
        border: 1px solid #ccc;
        padding: 1px;
        text-align: left;
    }
    
    td {
        color: #000000;
        font-size: 80%;
    }
    
    th {
        font-size: 50%;
        cursor: pointer;
        background-color: #f2f2f2;
        transition: font-size 1s ease-in-out,
            background-color 1s ease-in-out,
            color 1s ease-in-out;
    }    
}
th:hover {
    font-size: 21px;
    color: #4b7878;
}

.pagination {
    list-style-type: none;
    display: flex;
    justify-content: center;
    margin-bottom: 4%;
}

.pagination button.active {
    background-color: #68abc6;
    color: #fff;
    margin-left: 8px;
    margin-right: 8px;
}

.pagination button {
    margin-left: 1px;
    margin-right: 1px;
}

.pagination li {
    margin: 0 5px;
    cursor: pointer;
}

.pagination li.active {
    font-weight: bold;
}

.TableRow:hover {
    background-color: #F5F5F5;
}

.loading {
    position: absolute;
    top: 50%;
    left: 50%;
}

.isLoadingTableStyle {
    opacity: 0.5;
}
.editTitleContainer {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    align-content: stretch;
}
.attachmentDelete {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    align-content: stretch;
}`;

// Apply the styles to the document
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);