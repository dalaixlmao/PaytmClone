export default function FriendBox({ name, onChange,onClick, setAmount }) {
  return (
    <div className="mt-5">
      <div className="flex flex-row items-center">
      <div className="text-center mr-2 bg-gray-200 p-2 rounded-full h-10 w-10">{name[0]}</div>
        <div className="pl-2">{name}</div>
      </div>
      <div className="flex flex-col">
        <div className="mt-2">Amount (in Rs)</div>
        <input className="bg-white border-2 p-2 mt-2 rounded-md" placeholder="Enter the amount to send" type="text" onChange={onChange} />
        <button className="text-white mt-2" onClick={onClick}>Initiate Transaction</button>
      </div>
    </div>
  );
}
