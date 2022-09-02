import React from 'react';
import Post from "./Post/Post.js";
import {useSelector} from 'react-redux';
import {Grid, CircularProgress} from '@material-ui/core';
import useStyles from "./styles";


// for your mfing confusion on a simple thing you have been studying for a week now.
// this function below is exported to App.js
// now const posts is a variable function that makes a callback to our redux Store component that has the whole states
// state parameter is just previous state, and state.posts is basically all the posts that have been posted.


export const Posts = ({setCurrentId}) => {
    const posts = useSelector((state) => state.posts);
    const classes = useStyles();

    return(
        !posts.length ? <CircularProgress /> :(
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {posts.map((post) =>(
                    <Grid key={post._id} item xs={12} sm={6}>
                        <Post post={post} setCurrentId={setCurrentId}/>
                    </Grid>

                ))}
            </Grid>
        )
    )
}
