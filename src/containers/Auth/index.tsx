"use client"
import { useState } from "react";
import LoginContainer from "./components/login";
import SignUpContainer from "./components/register";

const AuthContainer:React.FC = () => {

    const [isSignedUp, setSignedUp] = useState(false);
    return (  
        <div>
            {isSignedUp ? <LoginContainer /> : <SignUpContainer />}
        </div>
    );
}
 
export default AuthContainer;