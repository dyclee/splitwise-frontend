import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { createAccount } from './fetches/authentication';
import { Redirect, Route, useHistory } from 'react-router-dom';
import {useSelector} from 'react-redux';

const SignUpButton = ({needLogin}) => {
    const history = useHistory();

    const handleClick = () => history.push('/signup')

    return (
        <Button color="secondary" onClick={handleClick}>Create account</Button>
  );
}

const SignUpButtonContainer = () => {
    const needLogin = useSelector((state) => !state.authReducer.token);
    return <SignUpButton needLogin={needLogin} />;
}
export default SignUpButtonContainer;
