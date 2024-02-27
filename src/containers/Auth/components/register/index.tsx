"use client"
import { Button } from "antd";
import { useLazyAuthSignupQuery } from "@/redux/apis/auth";

const SignUpContainer:React.FC = () => {
    const handleSocialSignup = (provider: string) => {
        window.location.href = `http://127.0.0.1:8000/auth/${provider}/login`;
    };
    const [authSignup] = useLazyAuthSignupQuery();
    const handleSignup = async () => {
        const { user } = await authSignup({
        email: "e0y31928y@u.nus.edu",
        password: "123456ABCDEF$$$",
        }).unwrap();
    };

    return ( <div className="login-container">
    <Button onClick={() => handleSocialSignup("google")}>
Google Signup
</Button>
<Button onClick={() => handleSocialSignup("github")}>
Github Signup
</Button>
<Button onClick={handleSignup}>Signup</Button>
<Button>Login</Button>
</div> );
}
 
export default SignUpContainer;