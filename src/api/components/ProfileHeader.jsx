// export default function ProfileHeader({
//   user,
//   isOwnProfile,
//   isFollowing,
//   requestSent,
//   onFollow,
// }) {
//   return (
//     <div className="flex gap-10 py-10 border-b">
//       <img
//         src={user.profilePic || "/avatar.png"}
//         className="w-36 h-36 rounded-full"
//       />

//       <div>
//         <div className="flex gap-4 items-center">
//           <h2 className="text-xl font-semibold">
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
}) {
  const navigate = useNavigate();

  return (
    <div className="flex gap-10 py-10 border-b">
      
      {/* Avatar */}
      <img
        src={user.profilePic || "/avatar.png"}
        onClick={() => navigate(`/user/${user._id}`)}
        className="w-36 h-36 rounded-full cursor-pointer"
        alt=""
      />

      <div>
        <div className="flex gap-4 items-center">
          
          {/* Username */}
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
                className="border px-4 py-1 text-gray-500"
              >
                Requested
              </button>
            ) : (
              <button
                onClick={onFollow}
                className={`px-4 py-1 rounded ${
                  isFollowing
                    ? "border"
                    : "bg-blue-500 text-white"
                }`}
              >
                {isFollowing ? "Following" : "Follow"}
              </button>
            )
          )}
        </div>

        <div className="flex gap-6 mt-4">
          <span><b>{user.postsCount}</b> posts</span>
          <span><b>{user.followers.length}</b> followers</span>
          <span><b>{user.following.length}</b> following</span>
        </div>

        <p className="mt-4">{user.bio || "No bio yet"}</p>
      </div>
    </div>
  );
}
