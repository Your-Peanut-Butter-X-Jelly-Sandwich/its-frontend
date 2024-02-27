"use client"
import React from "react";
import { useState } from "react";
import LoginContainer from "./components/login";
import SignUpContainer from "./components/register";

const AuthContainer:React.FC = () => {

    const [isSignedUp, setSignedUp] = useState(false);
    return (  
        <div>
            {isSignedUp ? 
                <LoginContainer isSignedUp = {isSignedUp} setSignedUp = {setSignedUp}/> : 
                <SignUpContainer isSignedUp = {isSignedUp} setSignedUp = {setSignedUp}/>}
        </div>
    );
}
 
export default AuthContainer;