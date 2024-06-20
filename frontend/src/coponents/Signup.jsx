import Heading from "./SignupAndSignin/Heading";
import SubHeading from "./SignupAndSignin/SubHeading";
import InputBox from "./SignupAndSignin/InputBox";
import Button from "./SignupAndSignin/Button";
import { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjczMTFiOTQ3ZjU1NTA1ODhhMjk3MmE

export default function Signup() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  async function onClickHandle() {
    console.log("fname=>",firstname,"lnam=>",lastname,username,password);
    const response = await axios.post(
      "http://localhost:3000/api/v1/user/signup",
      {
        firstname: firstname,
        lastname: lastname,
        username: username,
        password: password,
      }
    );

    if (response.data.message === "user created successfully") {
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } else console.log(response);

    console.log("clicked");
  }
  return (
    <div className="rounded-xl flex flex-col h-4/5 bg-white w-75 items-center p-5 justify-around">
      <Heading text={"Sign Up"} />
      <SubHeading text={"Enter your information to create your account"} />
      <InputBox
        title={"First Name"}
        placeholder={"first name"}
        type={"text"}
        onClick={e=>{setFirstname(e.target.value)}}
      />
      <InputBox
        title={"Last Name"}
        placeholder={"last name"}
        type={"text"}
        onClick={e=>{setLastname(e.target.value)}}
      />
      <InputBox
        title={"Username/Email"}
        placeholder={"email"}
        type={"email"}
        onClick={e=>{setUsername(e.target.value)}}
      />
      <InputBox
        title={"Password"}
        placeholder={"password"}
        type={"password"}
        onClick={e=>{setPassword(e.target.value)}}
      />
      <Button label={"Sign Up"} onClick={onClickHandle} />
      <div className="text-black font-semibold">
        Already have an account? &nbsp;
        <a className="text-black font-semibold underline" href="/signin">
          Login
        </a>
      </div>
      <div></div>
    </div>
  );
}
