import React,{useState, useEffect} from 'react';
import useStyles from "./styles";
import {TextField, Button, Typography, Paper} from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch,useSelector } from 'react-redux';
import {createPost, updatePost} from '../../actions/posts.js' ;
import { useAuth } from '../../contexts/AuthContext';
export const Form = ({currentId, setCurrentId}) => {

    const {currentUser} = useAuth();
    const [postData, setPostData] = useState({creator:"", owner:currentUser["_delegate"]["email"] ,title:"",message:"",tags:"",selectedFile:""});
    const classes = useStyles();
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null) ;
    const dispatch = useDispatch();    
    
    // The dependency array basically tells the hook to "only trigger when the dependency array changes".
    useEffect(()=>{
        if (post) setPostData(post);
    }, [post]);


    const handleSubmit = (e)=>{
        e.preventDefault(); // to prevent refresh
        if (currentId){
            console.log(postData)
            dispatch(updatePost(currentId,postData));
        }
        else{
            dispatch(createPost(postData));
        }
        clear();
    }

    const clear = ()=>{
        setCurrentId(null);
        setPostData({creator:"", owner:currentUser["_delegate"]["email"]  ,  title:"",message:"",tags:"",selectedFile:""});
    }
    return(
        <Paper className={classes.paper}>
            <form autoComplete="on" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
            <Typography variant="h6"> {currentId?'Updating' : 'Creating'} a Memory</Typography>
            <TextField name="creator" vairant="outlined" label="Creator" fullWidth value={postData.creator} onChange={(e)=>setPostData({ ...postData, creator: e.target.value })}></TextField>
            <TextField name="title" vairant="outlined" label="Title" fullWidth value={postData.title} onChange={(e)=>setPostData({ ...postData, title: e.target.value })}></TextField>
            <TextField name="message" vairant="outlined" label="Message" fullWidth value={postData.message} onChange={(e)=>setPostData({ ...postData, message: e.target.value })}></TextField>
            <TextField name="tags" vairant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(e)=>setPostData({ ...postData, tags: e.target.value.split(',') })}></TextField>
            <div className={classes.fileInput}>
                <FileBase type="file" multiple={false} onDone={({base64})=> setPostData({ ...postData,selectedFile: base64})}></FileBase>
            <Button className={classes.buttonSubmit} variant="contained" color="primary" size='large' type="submit" fullWidth>Submit</Button>
            <Button variant="contained" color="secondary" size='small' onClick={clear} fullWidth>Clear</Button>
            </div>

            </form>
        </Paper>
    )
}
