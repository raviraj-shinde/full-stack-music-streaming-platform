import { useState, useEffect } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import { useNavigate } from "react-router-dom";
import { SongsAPI } from "../services/apiService";
import toast from "react-hot-toast";
import {
  Album,
  Clock,
  Disc,
  Disc2,
  Disc3,
  FileText,
  Image,
  Music,
  Navigation,
  Trash2,
} from "lucide-react";

const ListSong = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const fetchSongs = async () => {
    setLoading(true);
    try {
      const response = await SongsAPI.list();
      setData(response.data.songs);
    } catch (error) {
      toast.error("Failed to load songs");
    } finally {
      setLoading(false);
    }
  };

  const removeSong = async (id) => {
    setLoading(true);
    const confirmed = window.confirm(
      "Are you sure you want to delete this song?"
    );
    if (!confirmed) return; // user cancelled

    try {
      const response = await SongsAPI.remove(id);
      if (response.status == 204) {
        toast.success("Song deleted");
        await fetchSongs();
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  return (
    <DashboardLayout activeMenu="List Songs">
      {loading ? (
        <div className="grid place-items-center min-h-[80vh]">
          <div className="w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="p-6 ">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Songs Library
            </h1>
            <p className="text-gray-600">Manage your music collection</p>
          </div>

          {/* Table container */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
            {/* Table header */}
            <div className="bg-gradient-to-r from-[#3be477] to-[#2dd865] px-6 py-4">
              <div className="grid grid-cols-12 gap-4 items-center text-white font-semibold">
                <div className="col-span-2 flex items-center gap-2">
                  <Music className="w-4 h-4" />
                  <span>Cover</span>
                </div>

                <div className="col-span-3">Song Title</div>
                <div className="col-span-3 flex items-center gap-2">
                  <Disc3 className="w-4 h-4" />
                  <span>Album</span>
                </div>
                <div className="col-span-2 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Duration</span>
                </div>
                <div className="col-span-2 text-center">Actions</div>
              </div>
            </div>

            {/* Table body */}
            <div className="divide-y divide-gray-100">
              {data.length == 0 ? (
                <div className="px-6 py-12 text-center">
                  <Image className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">No songs found</p>
                  <p className="text-gray-500 text-sm mb-4">
                    Add some songs to get started
                  </p>

                  <button
                    onClick={() => navigate("/add-song")}
                    className="bg-green-600 cursor-pointer hover:bg-green-400 text-white w-min-24 h-10 py-1 px-2 transition-colors"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Navigation />
                      <span className="font-bold text-[20px]">Add Song</span>
                    </div>
                  </button>
                </div>
              ) : (
                data.map((song, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-12 gap-4 items-center px-6 py-4 hover:bg-gray-100 transition-colors duration-200"
                  >
                    {/* Song image */}
                    <div className="col-span-2">
                      <div className="w-12 h-12 shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden cursor-pointer">
                        <img
                          src={song.image}
                          alt={song.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Song name */}
                    <div className="col-span-3 pr-15 cursor-pointer">
                      <p className="font-medium text-gray-900 truncate">
                        {song?.name}
                      </p>
                    </div>

                    {/* Song Album */}
                    <div className="col-span-3 flex items-center gap-2 pr-15">
                      <p className="text-gray-600 truncate">
                        {song?.album || "NA"}
                      </p>
                    </div>

                    {/* Song Duration */}
                    <div className="col-span-2 flex items-center gap-2 pr-15">
                      <span className="bg-gray-100 inline-flex items-center px-2.5 py-1 rounded-full text-sm font-medium text-gray-800">
                        {song?.duration + " min" || "NA"}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="col-span-2 flex justify-center ">
                      <button
                        onClick={() => removeSong(song._id)}
                        title="Delete item"
                        className="cursor-pointer inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-50 text-red-700 transition-colors duration-200 group"
                      >
                        <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Footer stats */}
          {data.length > 0 && (
            <div className="mt-6 bg-gray-50 rounded-lg px-6 py-4">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>
                  Total Songs:
                  <span className="font-semibold to-gray-900">
                    {data.length}
                  </span>
                </span>

                <span>
                  Last updated:
                  <span className="font-semibold to-gray-900">Just Now</span>
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </DashboardLayout>
  );
};

export default ListSong;
