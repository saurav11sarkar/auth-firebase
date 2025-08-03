import { useNavigate } from "react-router";

const NoteFound = () => {
  const navaget = useNavigate();
  const handleClick = () => {
    navaget(-1);
  };

  
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <div className="flex items-center gap-2">
        <h2 className="text-4xl font-bold text-red-600">404</h2> 
      <h3 className="text-4xl font-bold text-gray-600">| Not Found</h3>
      </div>
      
      <button
        onClick={handleClick}
        className="text-white px-2 py-1 rounded-md bg-blue-500 hover:bg-blue-600"
      >
        Go Back
      </button>
    </div>
  );
};

export default NoteFound;
