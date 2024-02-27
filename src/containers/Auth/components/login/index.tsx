"use client"
import { Button } from "antd";

const LoginContainer:React.FC = () => {
    const handleSocialSignup = (provider: string) => {
        window.location.href = `http://127.0.0.1:8000/auth/${provider}/login`;
    };
    
    return ( 
        <div className="login-container">
            <Button onClick={() => handleSocialSignup("google")}>
        Google Signup
      </Button>
      <Button onClick={() => handleSocialSignup("github")}>
        Github Signup
      </Button>
      <Button>Login</Button>
        </div>
     );
}
 
export default LoginContainer;