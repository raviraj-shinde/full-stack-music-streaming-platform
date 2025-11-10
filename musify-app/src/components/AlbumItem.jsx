import { useNavigate } from "react-router-dom";

const AlbumItem = ({ image, name, desc, id }) => {
  const navigate = useNavigate();

  return (
    <div
      className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26] 
                 transition-all duration-300 group"
      onClick={() => navigate(`/album/${id}`)}
    >
      <div className="w-40 h-40 overflow-hidden rounded relative">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      {/* Album name */}
      <p
        className="font-bold mt-2 mb-1 text-white text-ellipsis overflow-hidden whitespace-nowrap 
                   transition-all duration-300 transform group-hover:-translate-y-1 group-hover:text-green-400"
        title={name}
      >
        {name}
      </p>

      {/* Album description */}
      <p
        className="text-slate-300 text-sm overflow-hidden text-ellipsis whitespace-nowrap 
                   transition-all duration-300 group-hover:text-gray-100"
        title={desc}
      >
        {desc}
      </p>
    </div>
  );
};

export default AlbumItem;
