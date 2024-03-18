"use client"
import React from "react";
import { useState } from "react";
import LoginContainer from "./components/Login";
import SignUpContainer from "./components/Register";

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