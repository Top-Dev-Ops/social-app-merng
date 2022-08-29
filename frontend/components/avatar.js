export default function Avatar({
  name
}) {
  return (
    <div className="w-10 h-10 rounded-full text-primary text-2xl bg-teal-500 flex justify-center items-center uppercase">
      {name}
    </div>
  )
}