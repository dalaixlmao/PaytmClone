export default function InputBox({title, placeholder, type, onClick}) {
    return (
        <div className="flex flex-col w-4/5">
        <div className="font-semibold text-black">{title}</div>
        <div className="pt-1">
          <input className="bg-white text-black border-2 border-solid border-gray-400 rounded-md p-2 w-full" placeholder={`Enter your ${placeholder}`} type={type} onChange={onClick}/>
        </div>
      </div>
    );
  }
  