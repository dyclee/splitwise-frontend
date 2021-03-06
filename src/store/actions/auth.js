import { baseUrl } from '../../config';
import { getFriends, removeFriends, receivedRequests, removeRequests } from './friends';
import { getExpenses, removeExpenses, receivedNotifications } from './expenses';

export const TOKEN_KEY = 'auth/token';
export const SET_TOKEN = 'authentication/SET_TOKEN';
export const REMOVE_TOKEN = 'authentication/REMOVE_TOKEN';

export const SET_USER = 'authentication/SET_USER';
export const REMOVE_USER = 'authentication/REMOVE_USER';

export const removeToken = () => ({ type: REMOVE_TOKEN });
export const setToken = token => ({ type: SET_TOKEN, token });

export const setUser = user => ({ type: SET_USER, user});
export const removeUser = () => ({ type: REMOVE_USER});

export const cashout = (userId) => async dispatch => {
    const res = await fetch(`${baseUrl}/users/cashout`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
    });
    if (res.ok) {
        const {user} = await res.json();
        dispatch(setUser(user))
        return;
    }
}

export const loadToken = () => async dispatch => {
    const token = window.localStorage.getItem(TOKEN_KEY);
    if (token) {
        const res = await fetch(`${baseUrl}/users`, {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token })
        });
        const userObj = await res.json();
        const { user, tokenId} = userObj;

        if (user) {
            window.localStorage.setItem("userId", user.id)
            dispatch(setToken(token));
            dispatch(setUser(user));
            dispatch(getFriends(user.id));
            dispatch(getExpenses(user.id));
            dispatch(receivedRequests(user.id));
            dispatch(receivedNotifications(user.id));
            return;
        }
        dispatch(removeToken());
        dispatch(removeUser());
        dispatch(removeFriends());
        dispatch(removeExpenses());
        dispatch(removeRequests());
        return
    }
    dispatch(removeToken());
    dispatch(removeUser());
    dispatch(removeFriends());
    dispatch(removeExpenses());
    dispatch(removeRequests());
}

export const login = (email, password) => async dispatch => {
    const res = await fetch(`${baseUrl}/session`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
        const { token, user } = await res.json();
        window.localStorage.setItem(TOKEN_KEY, token);
        dispatch(setToken(token));
        dispatch(setUser(user));
        dispatch(getFriends(user.id));
        dispatch(getExpenses(user.id));
        dispatch(receivedRequests(user.id));
        dispatch(receivedNotifications(user.id));


        return
    }
    const errorRes = await res.json();
    return errorRes;

};

export const logout = () => async (dispatch, getState) => {
    const {
        authReducer: { token },
    } = getState();

    const res = await fetch(`${baseUrl}/session`, {
        method: 'delete',
        headers: {
            Authorization: `Bearer ${token}`
        },
    });

    if (res.ok) {
        window.localStorage.removeItem(TOKEN_KEY);
        dispatch(removeToken());
        dispatch(removeUser());
        dispatch(removeFriends());
        dispatch(removeExpenses());
        dispatch(removeRequests());
        return
    }
    const errorRes = await res.json();
    return errorRes;
}

export const createAccount = ( {fullName, email, password, confirmPassword, imageUrl }) =>
    async dispatch =>
    {
        const res = await fetch(`${baseUrl}/session/signup`, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fullName, email, password, confirmPassword, imageUrl }),

        });

        if (res.ok) {
            const { user, tokenObj: { token }} = await res.json();
            window.localStorage.setItem("auth/token", token);
            dispatch(setToken(token));
            dispatch(setUser(user))
            return;
        }
        const errorRes = await res.json();
        return errorRes;
}
