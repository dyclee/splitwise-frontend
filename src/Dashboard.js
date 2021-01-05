import React, { useEffect, } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect, Route, Switch, useParams } from "react-router-dom";
import { Button } from '@material-ui/core';

import ExpenseBrowser from './ExpenseBrowser';
import FriendBrowser from './FriendBrowser';
import NewRequestList from './NewRequestList';
import AddFriendForm from './AddFriendForm';
import { receivedRequests } from './store/actions/friends';

const Dashboard = ({friendRequests}) => {

    // useEffect(() => {
    //     const userId = useSelector((state) => state.authReducer.user.id)
    //     console.log(userId);
    //     receivedRequests(userId)
    //   })
    if (friendRequests) {
        return (
        <main>
            <h1>Recent Activity</h1>
            <div>
                <NewRequestList
                friendRequests={friendRequests}
                />
                <div className="homepage-browsers">
                    <ExpenseBrowser />
                    <FriendBrowser />
                </div>
            </div>
        </main>
        )
    }

    return (
        <main>
            <h1>Recent Activity</h1>
            <div className="homepage-browsers">
                <ExpenseBrowser />
                <FriendBrowser />
            </div>
        </main>
    )
}

const DashboardContainer = () => {
    const friendRequests = useSelector(state => state.friendReducer.friendRequests);

    return (
        <Dashboard
        friendRequests={friendRequests}
        />
    )
}

export default DashboardContainer;
