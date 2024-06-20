import { useEffect, useState } from "react";
import AppBar from "./Dashboard/AppBar";
import Balance from "./Dashboard/Balance";
import UserComponent from "./Dashboard/UserComponent";
import axios from "axios";
export default function Dashboard() {
  const [filter, setFilter] = useState("");
  const [users, setUsers] = useState(null);
  const [balance, setBalance] = useState(0);


  useEffect(() => {
    async function handleOnInput() {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/user/bulk/?filter=${filter}`
        );
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }

    handleOnInput();
  }, [filter]);

  return (
    <div className="w-full h-full flex flex-col bg-white text-black">
      <AppBar username={"Anubhav"} />
      <Balance balance={balance} />
      <UserComponent setFilter={setFilter} users={users} />
    </div>
  );
}
