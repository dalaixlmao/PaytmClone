import { useNavigate } from "react-router-dom";

export default function User({ user, setUser }) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-row justify-between items-center pt-4">
      <div className="flex flex-row justify-between items-center">
        <div className="text-center mr-2 bg-gray-200 p-2 rounded-full h-10 w-10">
          {user.firstname[0]}
        </div>
        <div>{user.firstname + " " + user.lastname}</div>
      </div>
      <div>
        <button className="text-white" onClick={e=>{navigate("/send/?id="+user._id+"&firstname="+user.firstname+"&lastname="+user.lastname)}}>
          Send Money
        </button>
      </div>
    </div>
  );
}
