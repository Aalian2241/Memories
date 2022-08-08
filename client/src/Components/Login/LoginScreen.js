import React from "react";

import {getAuth} from 'firebase/auth';
import {StyledFirebaseAuth} from "react-firebaseui";


export const LoginScreen = (props) => {
    return(
        <StyledFirebaseAuth
        uiConfig={props.config}
        firebaseAuth={getAuth()}
        />
    );
};