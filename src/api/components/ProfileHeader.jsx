


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
    <div className="flex flex-row gap-4 md:gap-14 items-start pb-4 md:pb-12 border-b border-gray-200 dark:border-zinc-800 w-full transition-colors duration-300">

      {/* Avatar */}
      <img
        src={user.profilePic || "/avatar.png"}
        onClick={() => navigate(`/user/${user._id}`)}
        className="w-20 h-20 md:w-36 md:h-36 rounded-full object-cover cursor-pointer flex-shrink-0"
        alt="profile"
      />

      {/* Info */}
      <div className="flex-1">

        {/* Username + Actions Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between md:justify-start gap-2 md:gap-5 mb-4 md:mb-5">
          <h2
            onClick={() => navigate(`/user/${user._id}`)}
            className="text-xl md:text-2xl font-light text-gray-900 dark:text-white cursor-pointer hover:opacity-70 truncate max-w-[150px] md:max-w-none"
          >
            {user.username}
          </h2>

          {!isOwnProfile && (
            <div className="flex gap-2">
              {requestSent ? (
                <button
                  disabled
                  className="px-4 md:px-6 py-1.5 border border-gray-300 dark:border-zinc-700 bg-gray-100 dark:bg-zinc-800 text-gray-500 dark:text-gray-400 rounded-lg text-sm font-semibold cursor-not-allowed"
                >
                  Requested
                </button>
              ) : (
                <button
                  onClick={onFollow}
                  className={`px-4 md:px-6 py-1.5 rounded-lg text-sm font-semibold transition ${isFollowing
                    ? "border border-gray-300 dark:border-zinc-700 bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-zinc-700"
                    : "bg-gradient-to-r from-purple-500 to-cyan-400 text-white hover:opacity-90"
                    }`}
                >
                  {isFollowing ? "Following" : "Follow"}
                </button>
              )}

              <button
                onClick={onMessage}
                className="px-4 md:px-7 py-1.5 bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 rounded-lg text-sm font-semibold text-gray-900 dark:text-gray-100 transition border border-gray-200 dark:border-zinc-700 shadow-sm"
              >
                Message
              </button>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="flex gap-8 md:gap-12 mb-5 text-sm md:text-base">
          <span>
            <strong className="text-gray-900 dark:text-white font-semibold">{user.postsCount || 0}</strong>{" "}
            <span className="text-gray-600 dark:text-gray-400">posts</span>
          </span>
          <span>
            <strong className="text-gray-900 dark:text-white font-semibold">{user.followers?.length || 0}</strong>{" "}
            <span className="text-gray-600 dark:text-gray-400">followers</span>
          </span>
          <span>
            <strong className="text-gray-900 dark:text-white font-semibold">{user.following?.length || 0}</strong>{" "}
            <span className="text-gray-600 dark:text-gray-400">following</span>
          </span>
        </div>

        {/* Bio */}
        <div className="text-sm">
          <p className="font-semibold text-gray-900 dark:text-white">{user.username}</p>
          <p className="text-gray-700 dark:text-gray-300 mt-1 whitespace-pre-wrap">
            {user.bio || ""}
          </p>
        </div>
      </div>
    </div>
  );
}
