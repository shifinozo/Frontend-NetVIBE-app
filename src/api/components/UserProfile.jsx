


// import { useNavigate, useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { FiArrowLeft } from "react-icons/fi"

// import ProfileHeader from "./ProfileHeader";
// import ProfilePosts from "./ProfilePosts";
// import { api } from "../axios";
// import Sidebar from "../pages/navbar";

// export default function UserProfile() {
//   const { id } = useParams(); 
//   const currentUserId = localStorage.getItem("userId");

//   const [profile, setProfile] = useState(null);
//   const [isFollowing, setIsFollowing] = useState(false);
//   const [requestSent, setRequestSent] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await api.get(`/users/${id}`);
//         const user = res.data.user;

//         setProfile(user);
//         setIsFollowing(
//           user.followers.some(f => f._id === currentUserId)

//         );
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, [id, currentUserId]);

//   const handleFollow = async () => {
//     try {
//       console.log("started...");
      
//       const res = await api.post(`/follow/${id}`);

//       console.log("if started");
      

//       if (res.data.requested) {
//         setRequestSent(true);
//         return;
//       }

//       setIsFollowing(res.data.following);
//     } catch (err) {
//       console.error(err);
//     }
//   };



//   if (loading) return <p>Loading...</p>;
//   if (!profile) return <p>User not found</p>;


//   return (
//     <div className="flex">
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Profile Content */}
//       <div className="flex-1 ml-64 px-10 py-6">

//         <button
//       onClick={() => navigate(-1)}
//       className="flex items-center gap-2 text-gray-700 hover:text-black 
//                  mb-6 transition"
//     >
//       <FiArrowLeft size={22} />
//       <span className="text-sm font-medium">Back</span>
//     </button>

//         <ProfileHeader
//             user={profile}
//             isOwnProfile={profile._id === currentUserId}
//             isFollowing={isFollowing}
//             requestSent={requestSent}
//             onFollow={handleFollow}
//           />


//         {profile.isPrivate && !isFollowing ? (
//           <p className="text-center mt-10 text-gray-500">
//             🔒 This account is private
//           </p>
//         ) : (
//           <ProfilePosts userId={id} />
//         )}
//       </div>
//     </div>
//   );
// }



import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";

import ProfileHeader from "./ProfileHeader";
import ProfilePosts from "./ProfilePosts";
import { api } from "../axios";
import Sidebar from "../pages/navbar";

export default function UserProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const currentUserId = localStorage.getItem("userId");

  const [profile, setProfile] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get(`/users/${id}`);
        const user = res.data.user;

        setProfile(user);
        setIsFollowing(
          user.followers.some((f) => f._id === currentUserId)
        );
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id, currentUserId]);

  const handleFollow = async () => {
    try {
      const res = await api.post(`/follow/${id}`);

      if (res.data.requested) {
        setRequestSent(true);
        return;
      }

      setIsFollowing(res.data.following);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (!profile) return <p className="p-6">User not found</p>;

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 ml-64 max-w-4xl mx-auto">

        {/* 🔝 Instagram-style top bar */}
        <div className="sticky top-0 z-20 bg-white border-b px-6 py-3 flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <FiArrowLeft size={22} />
          </button>

          <h1 className="text-lg font-semibold">
            {profile.username}
          </h1>
        </div>

        {/* Profile */}
        <div className="px-6 py-6">
          <ProfileHeader
            user={profile}
            isOwnProfile={profile._id === currentUserId}
            isFollowing={isFollowing}
            requestSent={requestSent}
            onFollow={handleFollow}
          />

          {profile.isPrivate && !isFollowing ? (
            <p className="text-center mt-10 text-gray-500">
              🔒 This account is private
            </p>
          ) : (
            <ProfilePosts userId={id} />
          )}
        </div>
      </div>
    </div>
  );
}
