// reducers are functions that get a state, and return a certain action
// export default does it so that the whole code segment is exported
// so when we code |import posts from "posts.js"|
// its like import posts.js's default export function as "posts"


export default (posts=[], action) =>{
    switch (action.type) {
        case "UPDATE":
            return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
        case "FETCH_ALL":
            return action.payload;
        case "LIKE":
            return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
        case "CREATE":
            return [...posts, action.payload]; // persists all the previous posts and returns a new post
        case "DELETE":
            return posts.filter((post) => post._id !== action.payload);
        default:
            return posts;
    }
}