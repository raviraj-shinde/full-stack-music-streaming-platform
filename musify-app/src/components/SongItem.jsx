import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";

const SongItem = ({ name, id, desc, image }) => {
  const { playWithId } = useContext(PlayerContext);

  return (
    <div
      className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26] 
                 transition-all duration-300 group"
      onClick={() => playWithId(id)} // 🔥 fix — triggers song change
    >
      <div className="w-40 h-40 overflow-hidden rounded relative">
        <img
          src={image}
          alt="album"
          className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      {/* Title */}
      <p
        className="font-bold mt-2 mb-1 text-white text-ellipsis overflow-hidden whitespace-nowrap
                   transition-all duration-300 group-hover:text-green-400"
        title={name}
      >
        {name}
      </p>

      {/* Description */}
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

export default SongItem;
