import { useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import { Image } from "lucide-react";
import { AlbumsAPI } from "../services/apiService";
import toast from "react-hot-toast";

const AddAlbum = () => {
  const [image, setImage] = useState(false);
  const [colour, setColour] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      const request = {
        name,
        desc,
        bgColor: colour,
      };

      formData.append("request", JSON.stringify(request));
      formData.append("file", image);

      const response = await AlbumsAPI.add(formData);

      if (response.status == 201) {
        toast.success("Album added!");
        setName("");
        setColour("");
        setDesc("");
        setImage(false);
      } else {
        toast.error(
          "something went wrong while adding a album. Please try again."
        );
      }
    } catch (error) {
      toast.error("Error adding a album. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout activeMenu="Add Album">
      {loading ? (
        <div className="grid place-items-center min-h-[80vh]">
          <div className="w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin"></div>
        </div>
      ) : (
        <form
          onSubmit={onSubmitHandler}
          className="flex flex-col items-start gap-8 text-gray-600 mt-5"
        >
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

          {/* Album name */}
          <div className="flex flex-col gap-2.5">
            <p>Album Name</p>
            <input
              type="text"
              value={name}
              className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw, 250px)]"
              placeholder="Type Here"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Album desc */}
          <div className="flex flex-col gap-2.5 w-full max-w-3xl">
            <p>Album Description</p>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Type description here"
              className="bg-transparent outline-green-600 border-2 border-gray-400 p-3 w-full min-h-32 resize-y"
            />
          </div>

          {/* Album background color */}
          <div className="flex flex-col gap-3">
            <p>Background Color</p>
            <input
              type="color"
              value={colour}
              onChange={(e) => setColour(e.target.value)}
            />
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

export default AddAlbum;
