import  express  from "express";
import {getPosts,likePost, createPosts, updatePost,deletePost} from "../controllers/posts.js";

const router = express.Router();

router.post('/', getPosts);
router.post('/create', createPosts);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);
router.patch('/:id/likePost', likePost);
export default router;


