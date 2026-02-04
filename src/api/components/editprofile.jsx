
// import { useEffect, useState } from "react";
// import { api } from "../axios";
// import { useNavigate } from "react-router-dom";
// import Sidebar from "../pages/navbar";

// export default function EditProfile() {
//   const navigate = useNavigate();

//   const [username, setUsername] = useState("");
//   const [bio, setBio] = useState("");
//   const [isPrivate, setIsPrivate] = useState(false);
//   const [profilePic, setProfilePic] = useState(null);
//   const [loading, setLoading] = useState(false);
//   // -----------------------
//   useEffect(() => {
//   const fetchProfile = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       const res = await api.get("/profile/getUserProfile/me", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setUsername(res.data.user.username || "");
//       setBio(res.data.user.bio || "");
//       setIsPrivate(res.data.user.isPrivate || false);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   fetchProfile();
// }, []);
// // -------------------------

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const formData = new FormData();
//     formData.append("username", username);
//     formData.append("bio", bio);
//     formData.append("isPrivate", isPrivate? "true" : "false");
//     if (profilePic) formData.append("profilePic", profilePic);

//     try {
//       const token = localStorage.getItem("token");

//       const res = await api.put("/profile/edit", formData, { 
//         headers: {
//           Authorization: `Bearer ${token}`,
//           // "Content-Type": "multipart/form-data",
//         },
//       });
//       console.log("started to edit");

//       const newUsername = res.data.user.username;
//       navigate(`/profile/${newUsername}`);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//   <div className="min-h-screen flex bg-gray-100 dark:bg-black">

//     <div className="hidden md:block w-64 border-r border-gray-200 dark:border-zinc-800">
//       <Sidebar />
//     </div>

//     <div className="flex-1 flex justify-center px-4 py-10">
//       <form
//         onSubmit={handleSubmit}
//         className="w-full max-w-md rounded-xl p-6 
//         bg-white dark:bg-zinc-900 
//         shadow-lg dark:shadow-zinc-800"
//       >
//         <h2 className="text-2xl font-semibold mb-6 
//           text-gray-900 dark:text-white text-center">
//           Edit Profile
//         </h2>

//         <div className="flex items-center gap-6 mb-6">
//               <div className="w-16 h-16 rounded-full bg-gray-300 dark:bg-zinc-700 overflow-hidden">
//                 {profilePic && (
//                   <img
//                     src={URL.createObjectURL(profilePic)}
//                     alt="profile"
//                     className="w-full h-full object-cover"
//                   />
//                 )}
//               </div>

//               <div>
//                 <h3 className="font-semibold text-gray-900 dark:text-white">
//                   Edit Profile
//                 </h3>

//                 <label className="text-sm text-blue-500 cursor-pointer hover:underline">
//                   Change profile photo
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={(e) => setProfilePic(e.target.files[0])}
//                     className="hidden"
//                   />
//                 </label>
//               </div>
//             </div>


//         <input
//           type="text"
//           placeholder="Username"
//           className="w-full mb-4 rounded-lg border px-3 py-2 
//           bg-white dark:bg-zinc-800
//           border-gray-300 dark:border-zinc-700
//           text-gray-900 dark:text-white
//           focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />

//         <textarea
//           placeholder="Bio"
//           rows={3}
//           className="w-full mb-4 rounded-lg border px-3 py-2 
//           bg-white dark:bg-zinc-800
//           border-gray-300 dark:border-zinc-700
//           text-gray-900 dark:text-white
//           focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
//           value={bio}
//           onChange={(e) => setBio(e.target.value)}
//         />

//         <label className="flex items-center justify-between mb-6">
//           <span className="text-gray-700 dark:text-gray-300 font-medium">
//             Private account
//           </span>

//           <button
//             type="button"
//             onClick={() => setIsPrivate(!isPrivate)}
//             className={`relative h-6 w-11 rounded-full transition-colors
//               ${isPrivate ? "bg-emerald-400 dark:bg-white" : "bg-gray-300 dark:bg-zinc-700"}`}
//           >
//             <span
//               className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full transition-transform
//                 bg-white dark:bg-green-400
//                 ${isPrivate ? "translate-x-5" : ""}`}
//             />
//           </button>
//         </label>

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full py-2 rounded-lg font-medium
//           bg-black text-white
//           dark:bg-white dark:text-black
//           hover:opacity-90 transition disabled:opacity-50"
//         >
//           {loading ? "Saving..." : "Save Changes"}
//         </button>
//       </form>
//     </div>
//   </div>
// );
// ;
// }


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

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/profile/getUserProfile/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUsername(res.data.user.username || "");
        setBio(res.data.user.bio || "");
        setIsPrivate(res.data.user.isPrivate || false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("username", username);
    formData.append("bio", bio);
    formData.append("isPrivate", isPrivate ? "true" : "false");
    if (profilePic) formData.append("profilePic", profilePic);

    try {
      const token = localStorage.getItem("token");
      const res = await api.put("/profile/edit", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      navigate(`/profile/${res.data.user.username}`);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <main className="flex-1 ml-0 md:ml-64 px-4 md:px-10 py-10 pt-20 pb-20 md:py-10 flex justify-center">

        {/* Card */}
        <form
          onSubmit={handleSubmit}
          className="
            w-full max-w-lg
            bg-white border border-gray-200
            rounded-2xl shadow-sm
            p-6 md:p-8
          "
        >
          <h2 className="
            text-xl md:text-2xl font-semibold mb-6 md:mb-8 text-center
            bg-gradient-to-r from-purple-500 to-cyan-500
            text-transparent bg-clip-text
          ">
            Edit Profile
          </h2>

          {/* Avatar */}
          <div className="flex items-center gap-6 mb-8">
            <div className="w-20 h-20 rounded-full overflow-hidden border bg-gray-100">
              {profilePic ? (
                <img
                  src={URL.createObjectURL(profilePic)}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                  Photo
                </div>
              )}
            </div>

            <div>
              <p className="font-medium text-gray-900">Profile photo</p>
              <label className="text-sm text-blue-600 cursor-pointer hover:underline">
                Change photo
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setProfilePic(e.target.files[0])}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Username */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="
                w-full px-4 py-2 rounded-lg
                border border-gray-300
                text-sm
                focus:outline-none focus:ring-2 focus:ring-purple-400
              "
            />
          </div>

          {/* Bio */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bio
            </label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="
                w-full px-4 py-2 rounded-lg
                border border-gray-300
                text-sm
                focus:outline-none focus:ring-2 focus:ring-cyan-400
              "
            />
          </div>

          {/* Privacy Toggle */}
          <div className="flex items-center justify-between mb-8">
            <span className="text-sm font-medium text-gray-700">
              Private account
            </span>

            <button
              type="button"
              onClick={() => setIsPrivate(!isPrivate)}
              className={`
                relative w-11 h-6 rounded-full transition
                ${isPrivate ? "bg-gradient-to-r from-purple-500 to-cyan-500" : "bg-gray-300"}
              `}
            >
              <span
                className={`
                  absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform
                  ${isPrivate ? "translate-x-5" : ""}
                `}
              />
            </button>
          </div>

          {/* Save */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full py-2.5 rounded-full
              bg-gradient-to-r from-purple-500 to-cyan-500
              text-white font-semibold text-sm
              hover:opacity-90 transition
              disabled:opacity-50
            "
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </main>
    </div>
  );
}
