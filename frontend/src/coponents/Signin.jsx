import Heading from "./SignupAndSignin/Heading";
import SubHeading from "./SignupAndSignin/SubHeading";
import InputBox from "./SignupAndSignin/InputBox";
import Button from "./SignupAndSignin/Button";
import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signin() {
    const usernameRef=useRef();
    const passwordRef=useRef();
    const navigate = useNavigate();
    async function onClickHandle(){
        const username=usernameRef.current.value;
        const password=passwordRef.current.value;
        const response = await axios.post("http://localhost:3000/api/v1/user/signin",{
            username:username,
            password:password
        });

        localStorage.setItem("token", response.data.token);
        navigate('/dashboard');
        
        console.log("clicked");
      }
      return (
        <div className="rounded-xl flex flex-col h-3/5 bg-white w-75 items-center p-5 justify-around">
          <Heading text={"Sign In"} />
          <SubHeading text={"Enter your credentials to access your account"}/>
          <InputBox title={"Username/Email"} placeholder={"email"} type={"email"} inputRef={usernameRef} />
          <InputBox title={"Password"} placeholder={"password"} type={"password"} inputRef={passwordRef} />
          <Button label={"Sign In"} onClick={onClickHandle}/>
          <div className="text-black font-semibold">
            Dont have an account? &nbsp;
            <a className="text-black font-semibold underline" href="/signup">Sign Up</a>
          </div>
          <div></div>
        </div>
      );
    }
    