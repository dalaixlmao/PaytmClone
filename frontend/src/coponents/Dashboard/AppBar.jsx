export default function AppBar({username}) {

  return (
    <div className="shadow-lg flex flex-row justify-between items-center p-2 pl-8 pr-8">
      <div className="font-bold text-xl">PayTM App</div>
      <div className="flex flex-row justify-between items-center">
        <div className="pr-5 font-medium">Hello</div>
        <div>
            <button className=" h-min w-min text-lg rounded-full text-white bg-blue-300">{username[0]}</button>
        </div>
      </div>
    </div>
  );
}
