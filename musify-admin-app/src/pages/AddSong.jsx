import { useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import { CheckCircle, Image, Music2Icon } from "lucide-react";
import toast from "react-hot-toast";
import {AlbumsAPI, SongsAPI } from "../services/apiService";

const AddSong = () => {
  const [image, setImage] = useState(false);
  const [song, setSong] = useState(false);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [album, setAlbum] = useState("none");
  const [loading, setLoading] = useState(false);
  const [albumData, setAlbumData] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      const request = {
        name,
        desc,
        album
      };

      formData.append("request", JSON.stringify(request));
      formData.append("audio", song);
      formData.append("image", image);

      const response = await SongsAPI.add(formData);

      if (response.status == 201) {
        toast.success("Song added!");
        setName("");
        setDesc("");
        setImage(false);
        setSong(false);
        setAlbum("none");
      } else {
        toast.error(
          "something went wrong while adding a song. Please try again."
        );
      }
    } catch (error) {
      toast.error("Error adding a song. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const loadAlbumData = async () => {
    try {
      const response = await AlbumsAPI.list();
      setAlbumData(response.data.albums);
    } catch (error) {
      toast.error("Failed to load albums");
    }
  };

  useEffect(() => {
    loadAlbumData();
  }, []);

  return (
    <DashboardLayout activeMenu="Add Song">
      {loading ? (
        <div className="grid place-items-center min-h-[80vh]">
          <div className="w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin"></div>
        </div>
      ) : (
        <form
          onSubmit={onSubmitHandler}
          className="flex flex-col items-start gap-8 text-gray-600 mt-5"
        >
          <div className="flex gap-32">
            {/* Upload file */}
            <div className="flex flex-col gap-4">
              <p>Upload File</p>

              <input
                onChange={(e) => setSong(e.target.files[0])}
                type="file"
                accept="audio/*"
                id="song"
                hidden
              />

              <label
                htmlFor="song"
                className="flex flex-col items-center justify-center w-16 h-16 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:border-green-400 transition-colors overflow-hidden"
              >
                {song ? (
                  <div className="flex flex-col items-center text-green-500">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                ) : (
                  <Music2Icon className="w-8 h-8 text-gray-500" />
                )}
              </label>

              {song && (
                <div className="text-sm text-gray-600">
                  <p className="font-medium">{song.name}</p>
                  <p>{(song.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              )}
            </div>

            {/* Upload image */}
            <div className="flex flex-col gap-4">
              <p>Uplaod Image</p>
              <input
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                accept="image/*"
                id="image"
                hidden
              />
              <label
                htmlFor="image"
                className="flex flex-col items-center justify-center w-16 h-16 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:border-green-400 transition-colors overflow-hidden"
              >
                {image ? (
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <Image className="w-8 h-8 text-gray-500" />
                )}
              </label>

              {image && (
                <div className="text-sm text-gray-600">
                  <p className="font-medium">{image.name}</p>
                  <p>{(image.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              )}
            </div>
          </div>

          {/* Song name */}
          <div className="flex flex-col gap-2.5">
            <p>Song Name</p>
            <input
              type="text"
              value={name}
              className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw, 250px)]"
              placeholder="Type Here"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Song desc */}
          <div className="flex flex-col gap-2.5 w-full max-w-3xl">
            <p>Song Description</p>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Type description here"
              className="bg-transparent outline-green-600 border-2 border-gray-400 p-3 w-full min-h-32 resize-y"
            />
          </div>  

          {/* Song desc */}
          <div className="flex flex-col gap-2.5">
            <p>Album</p>
            <select
              defaultValue={album}
              onChange={(e) => setAlbum(e.target.value)}
              className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[150px]"
            >
              <option value="none">None</option>
              {albumData.map((album, index) => (
                <option value={album.name}>{album.name}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="flex text-base bg-red-400 text-white py-2.5 px-14 cursor-pointer hover:bg-red-500 rounded-4xl"
          >
            ADD
          </button>
        </form>
      )}
    </DashboardLayout>
  );
};

export default AddSong;
