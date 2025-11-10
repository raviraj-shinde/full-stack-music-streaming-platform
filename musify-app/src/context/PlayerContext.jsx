import { createContext, useEffect, useRef, useState } from "react";
import { useAuth } from "./AuthContext";
import axios from "axios";
import { API_BASE_URL } from "./AuthContext";

export const PlayerContext = createContext();

export const PlayerContextProvider = ({ children }) => {
  /* States and variables etc */

  const [songsData, setSongsData] = useState([]);
  const [albumsData, setAlbumsData] = useState([]);
  const { user, token, getAuthHeaders } = useAuth();
  const [track, setTrack] = useState(songsData[0]);
  const [playStatus, setPlayStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: {
      second: 0,
      minute: 0,
    },
    totalTime: {
      second: 0,
      minute: 0,
    },
  });

  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();

  /* Functions */

  const play = () => {
    audioRef.current.play();
    setPlayStatus(true);
  };

  const pause = () => {
    audioRef.current.pause();
    setPlayStatus(false);
  };

const playWithId = (id) => {
  const selectedTrack = songsData.find((item) => item._id === id);
  if (selectedTrack) {
    setTrack(selectedTrack);
    setTimeout(() => {
      audioRef.current.play();
      setPlayStatus(true);
    }, 100);
  }
};


const previous = () => {
  songsData.forEach((item, index) => {
    if (track._id === item._id && index > 0) {
      const prevTrack = songsData[index - 1];
      setTrack(prevTrack);
      setTimeout(() => {
        audioRef.current.play();
        setPlayStatus(true);
      }, 100);
    }
  });
};


  const next = () => {
    songsData.forEach((item, index) => {
      if (track._id === item._id && index < songsData.length - 1) {
        const nextTrack = songsData[index + 1];
        setTrack(nextTrack);
        setTimeout(() => {
          audioRef.current.play();
          setPlayStatus(true);
        }, 100); // small delay for state update
      }
    });
  };

  const seekSong = async (e) => {
    audioRef.current.currentTime =
      (e.nativeEvent.offsetX / seekBg.current.offsetWidth) *
      audioRef.current.duration;
  };

  const getSongData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/songs`, config);
      const songs = response.data.songs || []; // get songs from API
      setSongsData(songs); // store in songsData
      if (songs.length > 0) {
        setTrack(songs[0]);
      }
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

  //Config
  const config = {
    headers: getAuthHeaders(),
  };

  useEffect(() => {
    if (user && token) {
      getAlbumData();
      getSongData();
    }
  }, [user, token]);

  //Setup audio event listener
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateSeekBar = () => {
      if (seekBar.current && audio.duration) {
        const progress = (audio.currentTime / audio.duration) * 100;
        seekBar.current.style.width = Math.floor(progress) + "%";
        setTime({
          currentTime: {
            second: Math.floor(audio.currentTime % 60),
            minute: Math.floor(audio.currentTime / 60),
          },
          totalTime: {
            second: Math.floor(audio.duration % 60),
            minute: Math.floor(audio.duration / 60),
          },
        });
      }
    };

    const handleLoadedMetadata = () => {
      if (seekBar.current) {
        seekBar.current.style.width = "0%";
      }
    };

    //add event listeners
    audio.addEventListener("timeupdate", updateSeekBar);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);

    //cleanup function
    return () => {
      audio.removeEventListener("timeupdate", updateSeekBar);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [track]);

  const contextValue = {
    getSongData,
    getAlbumData,
    songsData,
    albumsData,
    audioRef,
    seekBar,
    seekBg,
    track,
    setTrack,
    playStatus,
    setPlayStatus,
    time,
    setTime,
    play,
    pause,
    playWithId,
    next,
    previous,
    seekSong,
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {children}
    </PlayerContext.Provider>
  );
};
