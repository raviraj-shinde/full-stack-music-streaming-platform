import { Route, Routes, useLocation } from "react-router-dom";
import DisplayHome from "./DisplayHome";
import Search from "./Search";
import DisplayAlbum from "./DisplayAlbum";
import Navbar from "./Navbar";
import { useContext, useRef } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { useEffect } from "react";

const Display = () => {
  const {albumsData} = useContext(PlayerContext);
  const displayRef = useRef(); 
  const location = useLocation();
  const isALbum = location.pathname.includes("album");
  const albumId = isALbum ? location.pathname.split("/").pop() : "";
  const album = isALbum ? albumsData.find(x => x._id == albumId) : null;
  const bgColor = album?.bgColour || '#121212';

   

  useEffect(() => {
    if(isALbum){
      displayRef.current.style.background = `linear-gradient(${bgColor}, #121212)`;
    } else{
      displayRef.current.style.background = '#121212';
    }
  }, [isALbum, bgColor])

  return (
    <div className="w-[100%] m-2 bg-[#121212] text-white lg:w-[75%] lg:ml-0 flex flex-col">
        {/* Sticky Navbar */}
      <div ref={displayRef} className="sticky top-0 z-10 bg-[#121212]/95 backdrop-blur-sm border-b border-gray-800/50 px-6 pt-4 pb-2">
        <Navbar/>
        {/* Scrollable content */}
        <div className="flex-1 px-6 pb-4 overflow-auto">
          <Routes>
            <Route path="/" element={<DisplayHome />} />
            <Route path="/album/:id" element={<DisplayAlbum album={albumsData.find(x => x._id == albumId)} />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Display;
