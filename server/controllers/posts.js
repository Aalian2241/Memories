import { response } from "express";
import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";
// these can be used with axios to make api calls and they are the funcction names.


export const getPosts = async (req,res)=>{
    const {ownerinfo} = req.body;
    //console.log("owner: "+ownerinfo)
    try{
    const postMessages = await PostMessage.find({owner:ownerinfo});
    //console.log (postMessages);

    res.status(200).json(postMessages);
    }

    catch(err){
        res.status(404).json({message: err.message});
    }
};

export const createPosts = async (req,res)=>{
    
    // create post body
    const post = req.body;
    const {owner} = post 
    // create document to save in mongodb
    const newPost = new PostMessage(post);
    // save the document in mongodb
    try {
        await newPost.save();
 
        res.status(201).json(newPost);

    } catch (error) {
        res.status(409).json({message: error.message});
    }

};

export const updatePost= async(req, res) => {
    try{
    const {id: _id} = req.params;
    const post = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post found with this id');
    
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post, _id}, {new:true});
    // console.log(updatedPost);
    res.status(201).json(updatedPost);
    }
    catch(error) {
        res.status(404).json({message: error.message});
    }
}

export const deletePost= async(req, res) => {
    try{
    const {id} = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post found with this id');

    await PostMessage.findByIdAndRemove(id);
    // console.log(updatedPost);
    res.status(201).json({message:'Post Deleted Successfully'});
    }
    catch(error) {
        res.status(404).json({message: error.message});
    }
}

export const likePost= async(req, res) => {
    try{
    const {id} = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post found with this id');

    const post = await PostMessage.findById(id);
    const updatedPost = await PostMessage.findByIdAndUpdate(id, {likeCount: post.likeCount+1}, {new:true});
    //console.log(updatedPost[likeCount]);
    // console.log(updatedPost);
    res.status(201).json(updatedPost);
    }
    catch(error) {
        res.status(404).json({message: error.message});
    }
}

