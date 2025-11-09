import { createContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import axios from "axios";
import { API_BASE_URL } from "./AuthContext";

export const PlayerContext = createContext();

export const PlayerContextProvider = ({ children }) => {
  const [songsData, setSongsData] = useState([]);
  const [albumsData, setAlbumsData] = useState([]);
  const { user, token, getAuthHeaders } = useAuth();

  const config = {
    headers: getAuthHeaders(),
  };

  const getSongData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/songs`, config);
      const songs = response.data.songs || []; // get songs from API
      setSongsData(songs); // store in songsData
    } catch (error) {
      console.error("Error fetching songs:", error);
      setSongsData([]);
    }
  };

  const getAlbumData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/albums`, config);
      const albums = response.data.albums || []; // get albums from API
      setAlbumsData(albums); // store in albumsData
    } catch (error) {
      console.error("Error fetching albums:", error);
      setAlbumsData([]);
    }
  };

  useEffect(() => {
    if (user && token) {
      getAlbumData();
      getSongData();
    }
  }, [user, token]);

  const contextValue = {
    getSongData,
    getAlbumData,
    songsData,
    albumsData,
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {children}
    </PlayerContext.Provider>
  );
};
