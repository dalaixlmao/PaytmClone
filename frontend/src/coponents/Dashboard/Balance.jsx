export default function Balance({balance}){
    return(<div className="p-8 text-xl font-semibold">
    Your Balance 
    <a className="text-black pl-4">${balance}</a>
    </div>)
}