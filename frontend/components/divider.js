export default function Divider({
  direction = 'horizontal',
}) {
  return (
    <>
      {direction === 'horizontal' ? (
        <div className="w-full h-px bg-stack-4" />
      ) : (
        <div className="w-px h-full bg-stack-4" />
      )}
    </>
  )
}