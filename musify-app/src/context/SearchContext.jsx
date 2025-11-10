import { createContext, useContext, useEffect, useState } from "react";
import {PlayerContext} from "./PlayerContext";

export const SearchContext = createContext();

export const useSearch = () => {
  const context = useContext(SearchContext);

  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState({ songs: [], albums: [] });
  const [isSearchActive, setIsSearchActive] = useState(false);
  const {songsData, albumsData} = useContext(PlayerContext);


    const clearSearch = () => {
        setSearchQuery('');
        setSearchResult(({ songs: [], albums: [] }));
        setIsSearchActive(false);
    }


  useEffect(() => {
    if (searchQuery.trim() == "") {
      setSearchResult({
        songs: [],
        albums: [],
      });
      return;
    }

    const query = searchQuery.toLowerCase();

    const filteredSongs = songsData.filter(
      (song) =>
        song.name.toLowerCase().includes(query) ||
        song.desc.toLowerCase().includes(query)
    );
    const filteredAlbums = albumsData.filter(
      (album) =>
        album.name.toLowerCase().includes(query) ||
        album.desc.toLowerCase().includes(query)
    );

    setSearchResult({ songs: filteredSongs, albums: filteredAlbums });
  }, [searchQuery, songsData, albumsData]);

  const contextValue = {
    searchQuery,
    setSearchQuery,
    searchResult,
    isSearchActive,
    setIsSearchActive,
    clearSearch
  };

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
};
