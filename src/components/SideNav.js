import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import List from '@mui/material/List';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import IconButton from '@mui/material/IconButton';
import MuiDrawer from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import { logout } from "../reducers/userSlice.js";

const SideNavComponent = (props) => {
    const setPage = props.setPage;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.userSlice.user);
    const [open, setOpen] = React.useState(true);
    const drawerWidth = 240;

    useEffect(() => {
        // if (user && user.role === "user") {
        //     setOpen(false);
        // }
    }, [])

    const AppBar = styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== 'open',
    })(({ theme, open }) => ({
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }),
    }));

    const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
        ({ theme, open }) => ({
            '& .MuiDrawer-paper': {
                position: 'relative',
                whiteSpace: 'nowrap',
                width: drawerWidth,
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                }),
                boxSizing: 'border-box',
                ...(!open && {
                    overflowX: 'hidden',
                    transition: theme.transitions.create('width', {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                    }),
                    width: theme.spacing(7),
                    [theme.breakpoints.up('sm')]: {
                        width: theme.spacing(9),
                    },
                }),
            },
        }),
    );

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };


    const toggleDrawer = () => {
        // setOpen(!open);
    };

    return (
        <div>
            <AppBar position="absolute" open={open}>
                <Toolbar
                    sx={{
                        pr: '25px', // keep right padding when drawer closed
                    }}
                >
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer}
                        sx={{
                            marginRight: '36px',
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        sx={{ flexGrow: 1 }}
                    >
                        Dashboard
                    </Typography>
                    {user && user.name}
                    <IconButton color="inherit" onClick={() => { handleLogout() }}>
                        <LogoutIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer style={{ height: "110%" }} variant="permanent" open={open}>
                <Toolbar
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        px: [1],
                    }}
                >
                    {/* <IconButton onClick={toggleDrawer}>
                        <ChevronLeftIcon />
                    </IconButton> */}
                </Toolbar>
                <Divider />
                <List>
                    <ListItemButton>
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" onClick={() => { setPage(1) }} />
                    </ListItemButton>
                    {user && user.role != "user" &&
                        <ListItemButton>
                            <ListItemIcon>
                                <GroupAddIcon />
                            </ListItemIcon>
                            <ListItemText primary="Create User" onClick={() => { setPage(2) }} />
                        </ListItemButton>
                    }
                    {/* <ListItemButton>
                        <ListItemIcon>
                            <PeopleIcon />
                        </ListItemIcon>
                        <ListItemText primary="View Folders" onClick={() => { setPage(3) }} />
                    </ListItemButton> */}
                    {user && user.role != "user" &&
                        <ListItemButton>
                            <ListItemIcon>
                                <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText primary="Create Drawer" onClick={() => { setPage(3) }} />
                        </ListItemButton>
                    }
                    <ListItemButton>
                        <ListItemIcon>
                            <CreateNewFolderIcon />
                        </ListItemIcon>
                        <ListItemText primary="Create Folder" onClick={() => { setPage(4) }} />
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemIcon>
                            <NoteAddIcon />
                        </ListItemIcon>
                        <ListItemText primary="Create File" onClick={() => { setPage(5) }} />
                    </ListItemButton>
                    {user && user.role != "user" &&
                        <ListItemButton>
                            <ListItemIcon>
                                <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText primary="Users Access" onClick={() => { setPage(6) }} />
                        </ListItemButton>
                    }
                    {user && user.role != "user" &&
                        <ListItemButton>
                            <ListItemIcon>
                                <PeopleAltIcon />
                            </ListItemIcon>
                            <ListItemText primary="View Users" onClick={() => { setPage(7) }} />
                        </ListItemButton>
                    }
                    <Divider sx={{ my: 1 }} />
                </List>
            </Drawer>
        </div>
    );
};

export default SideNavComponent;
