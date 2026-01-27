


// import { useNavigate } from "react-router-dom";

// export default function ProfileHeader({
//   user,
//   isOwnProfile,
//   isFollowing,
//   requestSent,
//   onFollow,
//   onMessage,
// }) {
//   const navigate = useNavigate();
 
  

//   return (
//     <div className="flex gap-10 py-10 border-b">

//       <img
//         src={user.profilePic || "/avatar.png"}
//         onClick={() => navigate(`/user/${user._id}`)}
//         className="w-36 h-36 rounded-full cursor-pointer"
//         alt=""
//       />

//       <div>
//         <div className="flex gap-4 items-center">

//           <h2
//             onClick={() => navigate(`/user/${user._id}`)}
//             className="text-xl font-semibold cursor-pointer hover:underline"
//           >
//             {user.username}
//           </h2>

//           {!isOwnProfile && (
//             requestSent ? (
//               <button
//                 disabled
//                 className="border px-4 py-1 text-gray-500"
//               >
//                 Requested
//               </button>
//             ) : (
//               <button
//                 onClick={onFollow}
//                 className={`px-4 py-1 rounded ${
//                   isFollowing
//                     ? "border"
//                     : "bg-blue-500 text-white"
//                 }`}
//               >
//                 {isFollowing ? "Following" : "Follow"}
//               </button>
//             )
//           )}
//         </div>

//         <div className="flex gap-6 mt-4">
//           <span><b>{user.postsCount}</b> posts</span>
//           <span><b>{user.followers.length}</b> followers</span>
//           <span><b>{user.following.length}</b> following</span>
//         </div>

//         <p className="mt-4">{user.bio || "No bio yet"}</p>

//         {!isOwnProfile && isFollowing && (
//           <button
//             onClick={onMessage}
//             className="px-4 py-1 border rounded-md"
//           >
//             Message
//           </button>
//         )}

//       </div>
//     </div>
//   );
// }


import { useNavigate } from "react-router-dom";

export default function ProfileHeader({
  user,
  isOwnProfile,
  isFollowing,
  requestSent,
  onFollow,
  onMessage,
}) {
  const navigate = useNavigate();

  return (
    <div className="bg-white border rounded-lg p-6 flex gap-10">
      
      {/* Profile Image */}
      <img
        src={user.profilePic || "/avatar.png"}
        onClick={() => navigate(`/user/${user._id}`)}
        className="w-32 h-32 rounded-full object-cover cursor-pointer border"
        alt="profile"
      />

      {/* Right Section */}
      <div className="flex-1">
        
        {/* Username + Actions */}
        <div className="flex items-center gap-4">
          <h2
            onClick={() => navigate(`/user/${user._id}`)}
            className="text-xl font-semibold cursor-pointer hover:underline"
          >
            {user.username}
          </h2>

          {!isOwnProfile && (
            requestSent ? (
              <button
                disabled
                // className="px-4 py-1 border rounded text-gray-500 text-sm"
                className="border px-4 py-1 text-gray-500 rounded-full bg-gradient-to-r from-purple-500 to-cyan-400 opacity-50 cursor-not-allowed"
              >
                Requested
              </button>
            ) : (
              <button
                onClick={onFollow}
                className={`px-4 py-1 rounded-full text-white font-semibold transition ${
                  isFollowing
                    ? "border border-purple-500 text-purple-500 hover:bg-gradient-to-r hover:from-purple-500 hover:to-cyan-400 hover:text-white"
                    : "bg-gradient-to-r from-purple-500 to-cyan-400 hover:opacity-90"
                }`}
              >
                {isFollowing ? "Following" : "Follow"}
              </button>
            )
          )}
        </div>

        {/* Stats */}
        <div className="flex gap-6 mt-4 text-sm">
          <span>
            <b>{user.postsCount}</b> posts
          </span>
          <span>
            <b>{user.followers.length}</b> followers
          </span>
          <span>
            <b>{user.following.length}</b> following
          </span>
        </div>

        {/* Bio */}
        <p className="mt-4 text-sm text-gray-700">
          {user.bio || "No bio yet"}
        </p>

        {/* Message Button */}
        {!isOwnProfile && isFollowing && (
          <button
            onClick={onMessage}
            // className="mt-4 px-4 py-1 border rounded-md text-sm hover:bg-gray-50"
            className="px-4 py-1 rounded-full bg-gradient-to-r from-purple-500 to-cyan-400 text-white font-semibold hover:opacity-90 transition"
          >
            Message
          </button>
        )}
      </div>
    </div>
  );
}
