import React, { useEffect,useState } from 'react';
import {Container, AppBar, Typography, Grow, Grid} from "@material-ui/core";
import { useDispatch } from 'react-redux';
import memories from "./Images/memories.png";

// two major components imported as Form and Posts
import { Posts } from './Components/Posts/Posts';
import { Form } from './Components/Form/Form';
import {getPosts} from "./actions/posts.js";
import useStyles from "./styles";
import {LoginScreen} from "./Components/Login/LoginScreen";
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/messaging';
import 'firebase/compat/firestore';

import {
    getAuth,
    onAuthStateChanged,
    GoogleAuthProvider, GithubAuthProvider, EmailAuthProvider, signInWithPopup,
    signOut,
  } from 'firebase/auth';

  let app;
  app = firebase.initializeApp({
    authDomain:"memories-aalian.firebaseapp.com",
    apiKey:'AIzaSyAsnBT0te0lBhWZXGNqL3h4cJ21oA3WyX8'
});


  const auth = firebase.auth();
const App = () => {
    const [currentId, setCurrentId] =useState(null);
    const classes = useStyles();
    const dispatch = useDispatch();
    
    // update the posts using useEffect
    useEffect(()=>{
        dispatch(getPosts());
    },[currentId,dispatch]);
    const [loginState, setLoginState]= useState("false");

    const uiConfig = {
        signInFlow:"popup",
        signInOptions:[
            GoogleAuthProvider.PROVIDER_ID,
            GithubAuthProvider.PROVIDER_ID,
            EmailAuthProvider.PROVIDER_ID
        ],
        callbacks:{
            signInSuccess: ()=>false}
    };
    const componentDidMount=()=>{
        auth.onAuthStateChanged(
            user =>{
                setLoginState(!!user);
                console.log("Auth state changed");
            }
        );
    
    };
        
    if(loginState==="false"){
        return (
        <LoginScreen config={uiConfig}/>
        )
    }
    else
    {
        return (// 
        
        <Container maxwidth = "lg">
                 <AppBar className={classes.appBar} position="static" color="inherit">
                <Typography className={classes.heading} variant="h2" align="center">Memories </Typography>
                <img className={classes.image} src={memories} alt = "memories" height="70" width={120}/> 
                <button onClick={()=>{auth.signOut()}}> Sign Out</button>

                </AppBar>
                <Grow in> 
                  
                  <Container >
                      
                      <Grid container className={classes.mainContainer} justifyContent="space-between" alignItems="stretch" spacing={3}>
                        
                          <Grid item xs={12} sm={7}>
                              
                              <Posts setCurrentId={setCurrentId}/>
                          </Grid>
                          <Grid item xs={12} sm={4}>
                              
                              <Form currentId={currentId} setCurrentId={setCurrentId}/>
                          </Grid>
                      </Grid>
  
                  </Container>
              </Grow>
        </Container>
        );
    
    } ;

};
export default App;

