import React, { useEffect,useState } from 'react';
import {Card} from "./card";
import {Container, AppBar, Typography, Grow, Grid} from "@material-ui/core";
import { useDispatch } from 'react-redux';
import memories from "./Images/memories.png";

// two major components imported as Form and Posts
import { Posts } from './Components/Posts/Posts';
import { Form } from './Components/Form/Form';

import {getPosts} from "./actions/posts.js";
import useStyles from "./styles";


const App = () => {
    const [currentId, setCurrentId] =useState(null);
    const classes = useStyles();
    const dispatch = useDispatch();
    
    // update the posts using useEffect
    useEffect(()=>{
        dispatch(getPosts());
    },[currentId,dispatch]);
    

    return (
        // 
        <Container maxwidth = "lg">
        
            <AppBar className={classes.appBar} position="static" color="inherit">
               <Typography className={classes.heading} variant="h2" align="center">Memories</Typography>
               <img className={classes.image} src={memories} alt = "memories" height="70" width={120}/> 
            </AppBar>

            <Grow in> 
                <Container >
                    (
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
}
export default App;

