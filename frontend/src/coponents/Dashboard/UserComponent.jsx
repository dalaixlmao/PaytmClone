import User from "./User";
import { useEffect, useState } from "react";
export default function UserComponent({ setFilter, users }) {
  const [user, setUser] = useState({});

  // function onSend() {
  //   if (id != "") {
  //     const response = axios.post("http://localhost:3000/api/v1/account/transfer",{
  //       to:id,
  //       amount
  //     })

  //   }
  // }

  return (
    <div className="flex flex-col w-full p-8">
      <div className="text-xl font-semibold">User</div>
      <div className="w-full pt-2">
        <input
          onChange={(e) => {
            setFilter(e.target.value);
          }}
          className="bg-white border-2 p-2 rounded-md w-full"
          placeholder="Search User..."
          type="text"
        />
      </div>
      <div>
        {users ? (
          users.map((elem) => {
            return <User user={elem} key={elem._id} setUser={setUser} />;
          })
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
