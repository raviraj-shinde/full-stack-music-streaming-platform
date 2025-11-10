import { useContext } from "react";
import { useParams } from "react-router-dom";
import { PlayerContext } from "../context/PlayerContext";
import { assets } from "../assets/assets";
import { Clock } from "lucide-react";

const DisplayAlbum = ({ album }) => {
  const { id } = useParams();
  const { albumsData, songsData, playWithId, track } = useContext(PlayerContext);

  // Filter songs that belong to the selected album
  const filteredSongs = songsData.filter((song) => song.album === album?.name);

  return (
    <>
      {/* Album Header */}
      <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end">
        <img src={album?.imageUrl} alt="" className="w-48 rounded shadow-lg" />
        <div className="flex flex-col">
          <p>Playlist</p>
          <h2 className="text-5xl font-bold mb-4 md:text-7xl">{album?.name}</h2>
          <h4 className="text-gray-300">{album?.desc}</h4>
          <p className="mt-1 text-gray-400">
            <img
              src={assets.logo}
              alt="logo"
              className="inline-block w-5 mr-1"
            />
            <b>Musify</b> • 1,23,456 likes • <b>{filteredSongs.length} Songs</b>
          </p>
        </div>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7] text-sm uppercase tracking-wider">
        <p>
          <b className="mr-4">#</b>
        </p>
        <p>Title</p>
        <p className="hidden sm:block">Date Added</p>
        <Clock className="m-auto w-4" />
      </div>
      <hr className="border-gray-700" />

      {/* Song List */}
      {filteredSongs.map((item, index) => (
        <div
          key={index}
          onClick={() => playWithId(item._id)} // 🎯 FIX — triggers playback
          className={`grid grid-cols-3 sm:grid-cols-4 gap-4 p-2 items-center cursor-pointer 
                     hover:bg-[#ffffff2b] transition-all duration-300 rounded 
                     ${track?._id === item._id ? "bg-[#1db95433]" : ""}`} // optional: highlight current song
        >
          <p className="text-white flex items-center">
            <b className="mr-4 text-[#a7a7a7]">{index + 1}</b>
            <img
              src={item.image}
              alt=""
              className="inline w-10 h-10 object-cover mr-5 rounded"
            />
            <span className="truncate">{item.name}</span>
          </p>

          <p className="text-[15px] truncate">{album?.name}</p>
          <p className="text-[15px] hidden sm:block text-gray-400">
            5 days ago
          </p>
          <p className="text-[15px] text-center text-gray-400">
            {item.duration}
          </p>
        </div>
      ))}
    </>
  );
};

export default DisplayAlbum;
