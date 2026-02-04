

// // --------------------------

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { api } from "../axios";
// import Sidebar from "../pages/navbar";

// export default function CreatePost() {
//   const [file, setFile] = useState(null);
//   const [caption, setCaption] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!file) {
//       alert("Please select an image");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("media", file);
//     formData.append("caption", caption);

//     try {
//       setLoading(true);

//       await api.post("/posts", formData, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       navigate("/Home"); 
//     } catch (error) {
//       console.error("Post upload failed:", error);
//       alert("Post upload failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-50">

//       <div className="hidden md:block w-64 border-r bg-white">
//         <Sidebar />
//       </div>

//       <div className="flex-1 flex justify-center items-start pt-10">
//         <div className="w-full max-w-md bg-white border rounded-lg">

//           <div className="flex justify-between items-center px-4 py-3 border-b">
//             <h2 className="font-semibold">Create new post</h2>
//             <button
//               onClick={handleSubmit}
//               disabled={loading}
//               className="text-blue-500 font-semibold disabled:text-blue-300"
//             >
//               {loading ? "Sharing..." : "Share"}
//             </button>
//           </div>


//           <div className="h-72 bg-black flex items-center justify-center">
//             {file ? (
//               <img
//                 src={URL.createObjectURL(file)}
//                 alt="preview"
//                 className="h-full object-contain"
//               />
//             ) : (
//               <label className="text-white cursor-pointer">
//                 <input
//                   type="file"
//                   accept="image/*"
//                   hidden
//                   onChange={(e) => setFile(e.target.files[0])}
//                 />
//                 Select image
//               </label>
//             )}
//           </div>

//           <div className="px-4 py-3 border-t">
//             <textarea
//               rows="3"
//               placeholder="Write a caption..."
//               value={caption}
//               onChange={(e) => setCaption(e.target.value)}
//               className="w-full resize-none outline-none text-sm"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

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
        },
      });

      navigate("/Home");
    } catch (err) {
      console.error(err);
      alert("Post upload failed");
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
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm md:max-w-lg bg-white border border-gray-200
          rounded-2xl shadow-sm overflow-hidden"
        >
          {/* Header */}
          <div className="px-4 md:px-6 py-4 md:py-5 border-b">
            <h2 className="text-xl md:text-2xl font-semibold text-center
              bg-gradient-to-r from-purple-500 to-cyan-500
              text-transparent bg-clip-text">
              Create New Post
            </h2>
          </div>

          {/* Image Upload */}
          <div className="h-[10rem] md:h-80 bg-gray-100 flex items-center justify-center">
            {file ? (
              <img
                src={URL.createObjectURL(file)}
                alt="preview"
                className="w-full h-full object-contain"
              />
            ) : (
              <label className="cursor-pointer text-sm text-gray-500
                hover:text-gray-700 transition">
                Click to upload image
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </label>
            )}
          </div>

          {/* Caption */}
          <div className="p-4 md:p-6 border-t">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Caption
            </label>
            <textarea
              rows={3}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Write a caption..."
              className="w-full px-3 md:px-4 py-2 rounded-lg border border-gray-300
              text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>

          {/* Action */}
          <div className="px-4 md:px-6 pb-4 md:pb-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-full
              bg-gradient-to-r from-purple-500 to-cyan-500
              text-white font-semibold text-sm
              hover:opacity-90 transition
              disabled:opacity-50"
            >
              {loading ? "Sharing..." : "Share Post"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

