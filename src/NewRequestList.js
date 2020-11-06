import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { receivedRequests } from './store/actions/friends';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));

// function generate(element) {
//   return [0, 1, 2].map((value) =>
//     React.cloneElement(element, {
//       key: value,
//     }),
//   );
// }

const NewRequestList = ({friendRequests}) => {
    const classes = useStyles();
    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);
    // useEffect(() => {
    //   const userId = useSelector((state) => state.authReducer.user.id)
    //   console.log(userId);
    //   receivedRequests(userId)
    // })
    // const friendRequests = useSelector((state) => state.friendReducer.friendRequests)
    // console.log(friendRequests);
    if (!friendRequests) {
      return null
    }
    return (
      <div className={classes.root}>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" className={classes.title}>
              Friend Requests
            </Typography>
            <div className={classes.demo}>
              <List dense={dense}>
                {friendRequests.forEach((request) => (
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <FolderIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={request.fullName}
                      secondary={secondary ? 'Secondary text' : null}
                    />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" aria-label="delete">
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>

                  )
                )
                }
              </List>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }


  const NewRequestListContainer = () => {
    const friendRequests = useSelector(state => state.friendReducer.friendRequests);
    console.log(friendRequests)
    return (
        <NewRequestList
            friendRequests={friendRequests}
        />
    )
}

export default NewRequestListContainer;
