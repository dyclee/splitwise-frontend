import React, { useEffect } from "react";
import { useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: '60ch',
      backgroundColor: theme.palette.background.paper,
      position: 'relative',
      overflow: 'auto',
      maxHeight: 400,
    },
    inline: {
      display: 'inline',
    },
  }));

const FriendList = ({friends}) => {
    const classes = useStyles();

    return (
      <>
        {friends ?
        <List className={classes.root}>
          {friends.map((user) => {
                  return (
                    <>
                    <ListItem key={user.id} alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar alt={user.fullName} src={user.imageUrl} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={user.fullName}
                            secondary={
                                <React.Fragment>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    className={classes.inline}
                                    color="textPrimary"
                                >
                                {user.email}
                                </Typography>
                                {""}
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    </>
                  )
              })}
      </List>
        :
        <h1>No current friends (yet)</h1>
        }
    </>
    )
}

const FriendListContainer = () => {
  const friends = useSelector(state => state.friendReducer.friends);

  return (
    <FriendList friends={friends} />
  )
}
export default FriendListContainer;
