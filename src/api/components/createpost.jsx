

// --------------------------

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../axios";
import Sidebar from "../pages/navbar";

export default function CreatePost() {
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("media", file);
    formData.append("caption", caption);

    try {
      setLoading(true);

      await api.post("/posts", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/Home"); 
    } catch (error) {
      console.error("Post upload failed:", error);
      alert("Post upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      
      <div className="hidden md:block w-64 border-r bg-white">
        <Sidebar />
      </div>

      <div className="flex-1 flex justify-center items-start pt-10">
        <div className="w-full max-w-md bg-white border rounded-lg">
          
          <div className="flex justify-between items-center px-4 py-3 border-b">
            <h2 className="font-semibold">Create new post</h2>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="text-blue-500 font-semibold disabled:text-blue-300"
            >
              {loading ? "Sharing..." : "Share"}
            </button>
          </div>

          
          <div className="h-72 bg-black flex items-center justify-center">
            {file ? (
              <img
                src={URL.createObjectURL(file)}
                alt="preview"
                className="h-full object-contain"
              />
            ) : (
              <label className="text-white cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => setFile(e.target.files[0])}
                />
                Select image
              </label>
            )}
          </div>

          <div className="px-4 py-3 border-t">
            <textarea
              rows="3"
              placeholder="Write a caption..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full resize-none outline-none text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
