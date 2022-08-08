import React, {useContext, useState, useEffect} from 'react';
import {auth} from "../firebase";

const AuthContext= React.createContext();


export const useAuth=()=>{return useContext(AuthContext);}

export const  AuthProvider = ({children})=>{
    const [currentUser,setCurrentUser] = useState();
    const [loading, setLoading]=useState(true);

    // FUNCTIONS TO BE USED LATER
    function signup (email, password){return auth.createUserWithEmailAndPassword(email,password)};
    function login(email,password){return auth.signInWithEmailAndPassword(email,password)};
    function logout(email,password){return auth.signOut()}

    useEffect(()=>{
        const Unsubscribe = auth.onAuthStateChanged(user=>{
            setCurrentUser(user)

            // once its verified that the user has signed up/logined in, set loading is false
            setLoading(false);});
        return Unsubscribe;    
    },[])
    
    const value= {currentUser, signup, login, logout};

    return(
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};