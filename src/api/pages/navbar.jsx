// import{Home,Search,PlusSquare,Send,Heart,User ,MoreHorizontal} from "lucide-react"
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { socket } from "../socket";
// import { api } from "../axios";


// export default function Sidebar() {
//   const navigate = useNavigate();
//   const username = localStorage.getItem("username");
//   const [showMore, setShowMore] = useState(false);
//   const [unreadCount, setUnreadCount] = useState(0);

//     // 🔥 FETCH UNREAD COUNT
//   const fetchUnreadCount = async () => {
//     try {
//       const res = await api.get("/notifications/unread-count");
//       setUnreadCount(res.data.count);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchUnreadCount();

//     // 🟢 NEW NOTIFICATION → increase badge
//     socket.on("notification", () => {
//       setUnreadCount(prev => prev + 1);
//     });

//     // 🔴 REMOVE NOTIFICATION
//     socket.on("notification-remove", () => {
//       setUnreadCount(prev => Math.max(prev - 1, 0));
//     });

//     return () => {
//       socket.off("notification");
//       socket.off("notification-remove");
//     };
//   }, []);

//   const handleLogout = () => {
//     socket.disconnect();
//     localStorage.clear();
//     navigate("/");
//   };

//   const openNotifications = async () => {
//     navigate("/notifications");
//     setUnreadCount(0);
//     await api.put("/notifications/mark-read");
//   };


//   return (
//     <div className="fixed left-0 top-0 h-screen w-56 bg-[#e6e2e2] flex flex-col py-6 px-4">
      
//       <div className="mb-10 text-2xl font-bold text-purple-600 text-center">
//         NetVIBE
//       </div>

//       <div className="flex flex-col gap-6 text-gray-800 flex-1">
//         <NavItem icon={<Home />} label="Home" onClick={()=>navigate("/home")}/>
//         <NavItem icon={<Search />} label="Search" onClick={() => navigate("/search")} />
//         <NavItem icon={<PlusSquare />} label="Create" onClick={()=>navigate("/create")}/>
//         <NavItem icon={<Send />} label="Messages"  onClick={()=>navigate("/messages")}/>
//         {/* <NavItem icon={<Heart />} label="Notifications" onClick={()=>navigate("/notifications")}/> */}
//                 {/* 🔔 NOTIFICATION BADGE */}
//         <div className="relative">
//           <NavItem
//             icon={<Heart />}
//             label="Notifications"
//             onClick={openNotifications}
//           />
//           {unreadCount > 0 && (
//             <span className="absolute top-0 left-4 bg-red-500 text-white text-xs rounded-full px-2">
//               {unreadCount}
//             </span>
//           )}
//         </div>

        
        
        
//         <NavItem
//           icon={<User />}
//           label="Profile"
//           onClick={() => navigate(`/profile/${username}`)}
//         />
//       </div>


//       <div className="relative">
//         <NavItem
//           icon={<MoreHorizontal />}
//           label="More"
//           onClick={() => setShowMore(!showMore)}
//         />

//         {showMore && (
//           <div className="absolute bottom-12 left-0 w-full bg-white shadow-md rounded-md">
//             <div
//               onClick={handleLogout}
//               className="px-4 py-2 text-red-500 hover:bg-gray-100 cursor-pointer"
//             >
//               Logout
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



// function NavItem({ icon, label ,onClick }) {
//   return (
//     <div onClick={onClick} className="flex items-center gap-4 cursor-pointer group">
//       <div className="text-xl group-hover:text-purple-600 transition">
//         {icon}
//       </div>
//       <span className="font-medium group-hover:text-purple-600 transition">
//         {label}
//       </span>
//     </div>
//   );
// }




// ----------------------------------------------------------
import{Home,Search,PlusSquare,Send,Heart,User ,MoreHorizontal} from "lucide-react"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../socket";
import { api } from "../axios";


export default function Sidebar() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const [showMore, setShowMore] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

    // 🔥 FETCH UNREAD COUNT
  const fetchUnreadCount = async () => {
    try {
      const res = await api.get("/notifications/unread-count");
      setUnreadCount(res.data.count);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUnreadCount();

    // 🟢 NEW NOTIFICATION → increase badge
    socket.on("notification", () => {
      setUnreadCount(prev => prev + 1);
    });

    // 🔴 REMOVE NOTIFICATION
    socket.on("notification-remove", () => {
      setUnreadCount(prev => Math.max(prev - 1, 0));
    });

    return () => {
      socket.off("notification");
      socket.off("notification-remove");
    };
  }, []);

  const handleLogout = () => {
    socket.disconnect();
    localStorage.clear();
    navigate("/");
  };

  const openNotifications = async () => {
    navigate("/notifications");
    setUnreadCount(0);
    await api.put("/notifications/mark-read");
  };


  return (
<div className="fixed left-0 top-0 h-screen w-56 bg-gray-100 flex flex-col py-6 px-4">

  <div className="mb-10 text-2xl font-bold text-purple-500 text-center">
    NetVIBE
  </div>

  <div className="flex flex-col gap-6 text-gray-800 flex-1">
    <NavItem icon={<Home />} label="Home" onClick={()=>navigate("/home")}/>
    <NavItem icon={<Search />} label="Search" onClick={() => navigate("/search")} />
    <NavItem icon={<PlusSquare />} label="Create" onClick={()=>navigate("/create")}/>
    <NavItem icon={<Send />} label="Messages"  onClick={()=>navigate("/messages")}/>
    
    <div className="relative">
      <NavItem icon={<Heart />} label="Notifications" onClick={openNotifications}/>
      {unreadCount > 0 && (
        <span className="absolute top-0 left-4 bg-gradient-to-r from-purple-500 to-cyan-400 text-white text-xs rounded-full px-2">
          {unreadCount}
        </span>
      )}
    </div>

    <NavItem icon={<User />} label="Profile" onClick={() => navigate(`/profile/${username}`)} />
  </div>

  <div className="relative">
    <NavItem icon={<MoreHorizontal />} label="More" onClick={() => setShowMore(!showMore)} />

    {showMore && (
      <div className="absolute bottom-12 left-0 w-full bg-white shadow-md rounded-md">
        <div
          onClick={handleLogout}
          className="px-4 py-2 text-purple-500 hover:bg-purple-50 cursor-pointer transition"
        >
          Logout
        </div>
      </div>
    )}
  </div>
</div>
  )}


function NavItem({ icon, label ,onClick }) {
  return (
    <div onClick={onClick} className="flex items-center gap-4 cursor-pointer group">
      <div className="text-xl group-hover:text-purple-500 transition">
        {icon}
      </div>
      <span className="font-medium group-hover:text-purple-500 transition">
        {label}
      </span>
    </div>
  );
}
