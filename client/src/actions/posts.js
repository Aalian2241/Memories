import * as api from '../api';
import {FETCH_ALL,CREATE,UPDATE,DELETE,LIKE} from '../constants/actionTypes';

// Action Creators
// DISPATCH ACTIONS UNDERNEATH IMPORTED TO MAINLY COMPONENTS AND FORMS AND POSTS.

export const getPosts = (id) => async (dispatch) => {

    // {data} is the response of the api.fetchPosts() as its like const response = await whatever;
    // {} brackets are for objects, as data is an object
    try {
        const {data} = await api.fetchPosts({ownerinfo:id});
        console.log(data)
        dispatch({type: FETCH_ALL, payload:data});
        
    } catch (error) {
        console.log(error);    
    }
};

export const createPost = (post) => async (dispatch) => {

    try {
        const {data} = await api.createPosts(post);
        dispatch({type: CREATE, payload:data});
    } catch (error) {
        console.log(error);
    }
};

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const {data} = await api.updatePost(id, post);
        dispatch({type: UPDATE, payload:data});
    } catch (error) {
        console.log(error);
    }

};

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);
        dispatch({type: DELETE, payload:id});
    } catch (error) {
        console.log(error);
    }
};
export const likePost = (id) => async (dispatch) => {
    try {
      const { data } = await api.likePost(id);
  
      dispatch({ type: LIKE, payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };

  