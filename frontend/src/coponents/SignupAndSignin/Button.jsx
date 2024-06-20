export default function Button({label, onClick})
{
  return (
    <div className="w-4/5 pt-1">
      <button className="w-full" onClick={onClick}>{label}</button>
    </div>
  );
}
