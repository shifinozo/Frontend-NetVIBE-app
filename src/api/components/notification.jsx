
// // ---------------------------------------------------

// import { useEffect, useState } from "react";
// import { api } from "../axios";
// import Sidebar from "../pages/navbar";
// import { useNavigate } from "react-router-dom";
// import { socket } from "../socket";


// export default function NotificationPage() {
//   const [notifications, setNotifications] = useState([]);
//   const navigate =useNavigate()

// useEffect(() => {

//   socket.on("notification", (data) => {
//     setNotifications((prev) => [data, ...prev]);
//   });


//   socket.on("notification-remove", ({ type, sender, post }) => {
//       setNotifications((prev) =>
//         prev.filter(
//           (n) =>
//             !(
//               n.type === type &&
//               n.sender?._id === sender &&
//               n.post?._id === post
//             )
//         )
//       );
//     });


//   return () => {
//     socket.off("notification");
//     socket.off("notification-remove");
//   };
// }, []);




//   useEffect(() => {
//     fetchNotifications();
//   }, []);

//   const fetchNotifications = async () => {
//     const res = await api.get("/notifications");
//     setNotifications(res.data);
//   };

//   const acceptRequest = async (e, senderId) => {
//     e.stopPropagation();
//     await api.post(`/follow/accept/${senderId}`);
//     fetchNotifications();
//   };

//   const rejectRequest = async (e, senderId) => {
//     e.stopPropagation(); 
//     await api.post(`/follow/reject/${senderId}`);
//     fetchNotifications();
//   };

//   return (
//     <div className="flex min-h-screen">
//       <div className="hidden md:block w-64 border-r">
//         <Sidebar />
//       </div>

//       <div className="flex-1 max-w-xl mx-auto p-6">
//         <h2 className="text-xl font-semibold mb-4">Notifications</h2>

//         {notifications.length === 0 && (
//           <p className="text-gray-400 text-center">No notifications</p>
//         )}


//         {notifications.map((n) => (
//             <div
//               key={n._id}
//               className="flex items-center gap-3 p-3 border rounded mb-3"
//             >
//               <img
//                 src={n.sender?.profilePic || "/avatar.png"}
//                 className="w-10 h-10 rounded-full"
//                 alt="avatar"
//               />

//               <div className="flex-1">
//                 <p className="text-sm">
//                   <b
//                     onClick={() =>
//                       n.sender && navigate(`/user/${n.sender._id}`)
//                     }
//                     className="cursor-pointer hover:underline"
//                   >
//                     {n.sender?.username || "Unknown user"}
//                   </b>{" "}
//                   {n.type === "follow" && n.isRequest
//                     ? "requested to follow you"
//                     : n.type === "follow"
//                     ? "started following you"
//                     : n.type === "like"
//                     ? "liked your post"
//                     : "commented on your post"}
//                 </p>
//               </div>

//               {n.type === "follow" && n.isRequest && n.sender && (
//                 <>
//                   <button onClick={(e) => acceptRequest(e, n.sender._id)}>
//                     Accept
//                   </button>
//                   <button onClick={(e) => rejectRequest(e, n.sender._id)}>
//                     Reject
//                   </button>
//                 </>
//               )}

//               {n.post?.media && (
//                 <img
//                   onClick={() => navigate(`/posts/${n.post._id}`)}
//                   src={n.post.media}
//                   className="w-12 h-12 object-cover rounded cursor-pointer"
//                 />
//               )}
//             </div>
//           ))}


//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { api } from "../axios";
import Sidebar from "../pages/navbar";
import { useNavigate } from "react-router-dom";
import { socket } from "../socket";

export default function NotificationPage() {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  /* SOCKET */
  useEffect(() => {
    socket.on("notification", (data) => {
      setNotifications((prev) => [data, ...prev]);
    });

    socket.on("notification-remove", ({ type, sender, post }) => {
      setNotifications((prev) =>
        prev.filter(
          (n) =>
            !(
              n.type === type &&
              n.sender?._id === sender &&
              n.post?._id === post
            )
        )
      );
    });

    return () => {
      socket.off("notification");
      socket.off("notification-remove");
    };
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    const res = await api.get("/notifications");
    setNotifications(res.data);
  };

  const acceptRequest = async (e, senderId) => {
    e.stopPropagation();
    await api.post(`/follow/accept/${senderId}`);
    fetchNotifications();
  };

  const rejectRequest = async (e, senderId) => {
    e.stopPropagation();
    await api.post(`/follow/reject/${senderId}`);
    fetchNotifications();
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <Sidebar />

      {/* CONTENT */}
      <main className="flex-1 ml-0 md:ml-64 px-4 py-8 pt-20 pb-20 md:py-8">
        <div className="max-w-xl mx-auto">

          {/* HEADER */}
          <h2
            className="text-2xl font-semibold mb-6 text-center
            bg-gradient-to-r from-purple-500 to-cyan-500
            bg-clip-text text-transparent"
          >
            Notifications
          </h2>

          {/* EMPTY */}
          {notifications.length === 0 && (
            <p className="text-gray-400 text-center">
              No notifications yet
            </p>
          )}

          {/* LIST */}
          <div className="space-y-4">
            {notifications.map((n) => (
              <div
                key={n._id}
                className="
                  flex items-center gap-4 p-4
                  bg-white border rounded-2xl shadow-sm
                  hover:shadow-md transition
                "
              >
                {/* AVATAR */}
                <img
                  src={n.sender?.profilePic || "/avatar.png"}
                  className="w-11 h-11 rounded-full object-cover"
                  alt="avatar"
                />

                {/* TEXT */}
                <div className="flex-1 text-sm">
                  <span
                    onClick={() =>
                      n.sender && navigate(`/user/${n.sender._id}`)
                    }
                    className="font-semibold cursor-pointer hover:underline mr-1"
                  >
                    {n.sender?.username || "Unknown user"}
                  </span>

                  {n.type === "follow" && n.isRequest
                    ? "requested to follow you"
                    : n.type === "follow"
                      ? "started following you"
                      : n.type === "like"
                        ? "liked your post"
                        : "commented on your post"}
                </div>

                {/* ACTIONS */}
                {n.type === "follow" && n.isRequest && n.sender && (
                  <div className="flex gap-2">
                    <button
                      onClick={(e) =>
                        acceptRequest(e, n.sender._id)
                      }
                      className="
                        px-3 py-1 text-xs rounded-lg font-medium
                        bg-gradient-to-r from-purple-500 to-cyan-500
                        text-white
                      "
                    >
                      Accept
                    </button>

                    <button
                      onClick={(e) =>
                        rejectRequest(e, n.sender._id)
                      }
                      className="
                        px-3 py-1 text-xs rounded-lg font-medium
                        border border-gray-300 text-gray-600
                        hover:bg-gray-100
                      "
                    >
                      Reject
                    </button>
                  </div>
                )}

                {/* POST PREVIEW */}
                {n.post?.media && (
                  <img
                    onClick={() =>
                      navigate(`/posts/${n.post._id}`)
                    }
                    src={n.post.media}
                    className="
                      w-12 h-12 object-cover rounded-lg
                      cursor-pointer border
                    "
                    alt="post"
                  />
                )}
              </div>
            ))}
          </div>

        </div>
      </main>
    </div>
  );
}
