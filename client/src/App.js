import React, { useEffect,useState } from 'react';
import {Container, AppBar, Typography, Grow, Grid} from "@material-ui/core";
import { useDispatch } from 'react-redux';
import memories from "./Images/memories.png";
// two major components imported as Form and Posts
import { Posts } from './Components/Posts/Posts';
import {useAuth} from "./contexts/AuthContext";
import { Form } from './Components/Form/Form';
import { AuthProvider } from './contexts/AuthContext';
import {Dashboard} from "./Components/Dashboard/Dashboard";
import SignUp from "./Components/Signup/signup2";
import {Login} from "./Components/Login/Login";
import {getPosts} from "./actions/posts.js";
import useStyles from "./styles";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from './Components/PrivateRoutes/PrivateRoute';


const HomePage = (props)=>{
    const {currentUser} = useAuth();
    const dispatch = useDispatch();
    console.log(currentUser["_delegate"]["email"])
    
    // update the posts using useEffect
    useEffect(()=>{
        dispatch(getPosts(currentUser["_delegate"]["email"]));
    },[props.currentId,dispatch,currentUser]);
    return(
        <Container maxwidth = "lg">
            <div align="right"> <Dashboard align="right"/></div>
        <AppBar className={props.classes_.appBar} position="static" color="inherit">
           <Typography className={props.classes_.heading} variant="h2" align="center">Memories</Typography>
           <img className={props.classes_.image} src={memories} alt = "memories" height="70" width={120}/> 
           
        </AppBar>

        <Grow in> 

            <Container >  
                <Grid container className={props.classes_.mainContainer} justifyContent="space-between" alignItems="stretch" spacing={3}>
                
                    <Grid item xs={12} sm={7}>    
                        <Posts setCurrentId={props.setCurrentId_}/>
                    </Grid>

                    <Grid item xs={12} sm={4}>      
                        <Form currentId={props.currentId_} setCurrentId={props.setCurrentId_}/>
                    </Grid>

                </Grid>
            </Container>

        </Grow>

    </Container>
    )
    
}
const App = () => {
    //useStates
    
    
    const [currentId, setCurrentId] =useState(null);
    const classes = useStyles();
    
    
    //HomePage Component
    let props= {
        currentId_:currentId,
        setCurrentId_:setCurrentId,
        classes_:classes
    }

        return( 
        <AuthProvider>
            <Container maxwidth="sm" align="left" style={{minwidth:"100vh"}} >
                <div style={{maxwidth:"300vh"}}>
                <Router>
                    <AuthProvider>
                        <Routes>
                            <Route element={<PrivateRoute/>}>
                            <Route path = "/" element={<HomePage {...props}/>}/>    
                            </Route>
                            <Route path = "/signup" element={<SignUp/>}/>
                            <Route path = "/dashboard" element={<Dashboard/>}/>
                            <Route path = "/login" element={<Login/>}/>
                           
                        </Routes>
                    </AuthProvider>
                </Router>
                </div>    
            </Container>
        </AuthProvider>
        
        )
    }
export default App;
