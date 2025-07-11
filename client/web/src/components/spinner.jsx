export default function Spinner() {
  return (
    <div className="flex items-center justify-center space-x-2 py-4">
      <div className="h-5 w-5 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]"></div>
      <div className="h-5 w-5 animate-bounce rounded-full bg-primary [animation-delay:-0.13s]"></div>
      <div className="h-5 w-5 animate-bounce rounded-full bg-primary"></div>
    </div>
  );
}
