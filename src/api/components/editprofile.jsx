
import { useEffect, useState } from "react";
import { api } from "../axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../pages/navbar";

export default function EditProfile() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [loading, setLoading] = useState(false);

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("username", username);
    formData.append("bio", bio);
    formData.append("isPrivate", isPrivate);
    if (profilePic) formData.append("profilePic", profilePic);

    try {
      const token = localStorage.getItem("token");
      console.log("started to edit");
      
      const res = await api.put("/profile/edit", formData, { 
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      const newUsername = res.data.user.username;
      navigate(`/profile/${newUsername}`);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="min-h-screen flex bg-gray-100 dark:bg-black">

    <div className="hidden md:block w-64 border-r border-gray-200 dark:border-zinc-800">
      <Sidebar />
    </div>

    <div className="flex-1 flex justify-center px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-xl p-6 
        bg-white dark:bg-zinc-900 
        shadow-lg dark:shadow-zinc-800"
      >
        <h2 className="text-2xl font-semibold mb-6 
          text-gray-900 dark:text-white text-center">
          Edit Profile
        </h2>

        <div className="flex items-center gap-6 mb-6">
              <div className="w-16 h-16 rounded-full bg-gray-300 dark:bg-zinc-700 overflow-hidden">
                {profilePic && (
                  <img
                    src={URL.createObjectURL(profilePic)}
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Edit Profile
                </h3>

                <label className="text-sm text-blue-500 cursor-pointer hover:underline">
                  Change profile photo
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setProfilePic(e.target.files[0])}
                    className="hidden"
                  />
                </label>
              </div>
            </div>


        <input
          type="text"
          placeholder="Username"
          className="w-full mb-4 rounded-lg border px-3 py-2 
          bg-white dark:bg-zinc-800
          border-gray-300 dark:border-zinc-700
          text-gray-900 dark:text-white
          focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <textarea
          placeholder="Bio"
          rows={3}
          className="w-full mb-4 rounded-lg border px-3 py-2 
          bg-white dark:bg-zinc-800
          border-gray-300 dark:border-zinc-700
          text-gray-900 dark:text-white
          focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />

        <label className="flex items-center justify-between mb-6">
          <span className="text-gray-700 dark:text-gray-300 font-medium">
            Private account
          </span>

          <button
            type="button"
            onClick={() => setIsPrivate(!isPrivate)}
            className={`relative h-6 w-11 rounded-full transition-colors
              ${isPrivate ? "bg-emerald-400 dark:bg-white" : "bg-gray-300 dark:bg-zinc-700"}`}
          >
            <span
              className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full transition-transform
                bg-white dark:bg-green-400
                ${isPrivate ? "translate-x-5" : ""}`}
            />
          </button>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 rounded-lg font-medium
          bg-black text-white
          dark:bg-white dark:text-black
          hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  </div>
);
;
}


