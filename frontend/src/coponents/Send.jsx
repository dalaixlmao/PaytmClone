import Heading from "./SignupAndSignin/Heading";
import FriendBox from "./SendMoney/FriendBox";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
export default function Send() {
  const [amount, setAmount] = useState("");
  const [searchParams] = useSearchParams();
  const [id, setId] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const idParam = searchParams.get("id");
    const firstName = searchParams.get("firstname");
    const lastName = searchParams.get("lastname");
    setId(idParam);
    setName(`${firstName} ${lastName}`);
  }, [searchParams]);

  const onClick = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/account/transfer",
        {
          to: id,
          amount: parseInt(amount),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="text-black flex flex-col items-center bg-white p-8 rounded-xl shadow-lg">
      <Heading text={"Send Money"} />
      <FriendBox name={name} onClick={onClick} onChange={e=>{setAmount(e.target.value)}}/>
    </div>
  );
}
