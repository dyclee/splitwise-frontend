import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';

import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';

import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import PersonIcon from '@material-ui/icons/Person';
import PeopleIcon from '@material-ui/icons/People';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';

// import FriendBrowser from './FriendBrowser';
// import ExpenseBrowser from './ExpenseBrowser';
import ExpenseForm from './ExpenseForm';
import AddFriendForm from './AddFriendForm';
import { logout } from './store/actions/auth';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const SideDrawer = ({needLogin}) => {
    const classes = useStyles();
    const history = useHistory();
    const [openExpenseForm, setOpenExpenseForm] = useState(false);
    const [openFriendForm, setOpenFriendForm] = useState(false);

    const dispatch = useDispatch();

    const handleLogout = () => {
          dispatch(logout());
    }

    const handleExpenseClick = () => {
        setOpenExpenseForm(true);
    }
    const handleFriendClick = () => {
        setOpenFriendForm(true);
    }
    if (needLogin) return null;
    return (

        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <Toolbar />
            <ExpenseForm
              handleExpenseClick={handleExpenseClick}
              openExpenseForm={openExpenseForm}
              setOpenExpenseForm={setOpenExpenseForm} />
            <AddFriendForm
              handleFriendClick={handleFriendClick}
              openFriendForm={openFriendForm}
              setOpenFriendForm={setOpenFriendForm}
              />
            <div className={classes.drawerContainer}>
              <List>
                  <ListItem button key="Expenses" onClick={handleExpenseClick}>
                    <ListItemIcon><AttachMoneyIcon /></ListItemIcon>
                    <ListItemText primary="Add Expense" />
                  </ListItem>
                  <ListItem button key="Friends" onClick={handleFriendClick}>
                    <ListItemIcon><PersonIcon /></ListItemIcon>
                    <ListItemText primary="Add Friend" />
                  </ListItem>
                  <ListItem button key="Groups">
                    <ListItemIcon><PeopleIcon /></ListItemIcon>
                    <ListItemText primary="Groups" />
                  </ListItem>
              </List>
              <Divider />
              <List>
                {['Notifications', 'Settings'].map((text, index) => (
                  <ListItem button key={text}>
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                ))}
                  <ListItem button key="Logout" onClick={handleLogout}>
                    <ListItemIcon><MeetingRoomIcon /></ListItemIcon>
                    <ListItemText primary="Logout" />
                  </ListItem>
              </List>
            </div>
        </Drawer>
    );
  }

  export default SideDrawer;
