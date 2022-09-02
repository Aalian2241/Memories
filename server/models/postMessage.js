import mongoose from "mongoose";

const postSchema_prv = new mongoose.Schema({
    owner:String,
    title:String,
    message:String,
    creator:String, 
    tags:[String],
    selectedFile: String,
    likeCount:{
        type:Number,
        default:0
    },
    createdAt:{
        type: Date, 
        default: new Date()
    },

});


const PostMessage = mongoose.model("PostMessage", postSchema_prv);
export default PostMessage;
