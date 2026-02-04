
// import { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import { api } from "../axios";
// import Sidebar from "./navbar";
// import ChatWindow from "../components/ChatWindow";

// export default function Messages() {
//   const [conversations, setConversations] = useState([]);
//   const [activeChat, setActiveChat] = useState(null);
//   const [search, setSearch] = useState("");
//   const [filter, setFilter] = useState("all");

//   const location = useLocation();

//   useEffect(() => {
//     fetchConversations();
//   }, []);

//   // ✅ AUTO OPEN CHAT (FROM PROFILE PAGE)
//   useEffect(() => {
//     if (location.state?._id && conversations.length > 0) {
//       const existing = conversations.find(
//         (c) => c._id === location.state._id
//       );
//       if (existing) setActiveChat(existing);
//     }
//   }, [location.state, conversations]);

//   const fetchConversations = async () => {
//     try {
//       const res = await api.get("/chat/conversations");
//       setConversations(res.data);
//     } catch (err) {
//       console.error("Failed to fetch conversations", err);
//     }
//   };

//   // filterum searchum
//   const filteredConversations = conversations.filter((c) => {
//     if (filter !== "all" && c.category !== filter) return false;
//     if (
//       search &&
//       !c.otherUser.username.toLowerCase().includes(search.toLowerCase())
//     )
//       return false;
//     return true;
//   });

//   return (
//     <div className="flex min-h-screen">
//       <Sidebar />

//       {/* left side */}
//       <div className="w-1/3 border-r bg-white ml-60">

//         <div className="p-3 border-b">
//           <input
//             type="text"
//             placeholder="Search chats"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="w-full border rounded px-3 py-2"
//           />
//         </div>

//         <div className="flex gap-2 p-3 border-b">
//           {["all", "mutual", "oneway", "stranger"].map((f) => (
//             <button
//               key={f}
//               onClick={() => setFilter(f)}
//               className={`px-3 py-1 rounded text-sm ${
//                 filter === f
//                   ? "bg-black text-white"
//                   : "bg-gray-200 text-black"
//               }`}
//             >
//               {f}
//             </button>
//           ))}
//         </div>

//         {filteredConversations.length === 0 && (
//           <p className="p-6 text-gray-400">No conversations found</p>
//         )}

//         {filteredConversations.map((c) => (
//           <div
//             key={c._id}
//             onClick={() => setActiveChat(c)}
//             className={`flex items-center gap-3 p-4 border-b cursor-pointer
//               ${activeChat?._id === c._id ? "bg-gray-100" : "hover:bg-gray-50"}
//             `}
//           >
//             <img
//               src={c.otherUser.profilePic || "/avatar.png"}
//               alt="profile"
//               className="w-10 h-10 rounded-full object-cover"
//             />

//             <div className="flex-1">
//               <p className="font-semibold">{c.otherUser.username}</p>
//               <p className="text-sm text-gray-500 truncate">
//                 {c.lastMessage?.text || "Start chatting"}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>
//       {/* right side */}
//       <div className="flex-1 ">
//         {activeChat ? (
//           <ChatWindow conversation={activeChat} />
//         ) : (
//           <p className="p-6 text-gray-400">Select a chat</p>
//         )}
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { api } from "../axios";
import Sidebar from "./navbar";
import ChatWindow from "../components/ChatWindow";

export default function Messages() {
  const [conversations, setConversations] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const location = useLocation();

  useEffect(() => {
    fetchConversations();
  }, []);

  // ✅ AUTO OPEN CHAT (FROM PROFILE PAGE)
  useEffect(() => {
    if (location.state?._id && conversations.length > 0) {
      const existing = conversations.find(
        (c) => c._id === location.state._id
      );
      if (existing) setActiveChat(existing);
    }
  }, [location.state, conversations]);

  const fetchConversations = async () => {
    try {
      const res = await api.get("/chat/conversations");
      setConversations(res.data);
    } catch (err) {
      console.error("Failed to fetch conversations", err);
    }
  };

  // filter + search
  const filteredConversations = conversations.filter((c) => {
    if (filter !== "all" && c.category !== filter) return false;
    if (
      search &&
      !c.otherUser.username.toLowerCase().includes(search.toLowerCase())
    )
      return false;
    return true;
  });

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-black transition-colors duration-300">
      {/* Sidebar */}
      <Sidebar />

      {/* Left Panel */}
      <div
        className={`
          border-r dark:border-zinc-800 bg-white dark:bg-zinc-900 ml-0 md:ml-64 transition-all duration-300
          ${activeChat ? "hidden md:block w-1/3" : "w-full md:w-1/3"}
          pb-20 md:pb-0
        `}
      >

        {/* Search Bar */}
        <div className="p-3 pt-16 md:pt-3 border-b dark:border-zinc-800 sticky top-0 md:static bg-white dark:bg-zinc-900 z-30 transition-colors duration-300">
          <input
            type="text"
            placeholder="Search chats"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border dark:border-zinc-700 rounded px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-cyan-400 outline-none bg-white dark:bg-zinc-800 text-gray-900 dark:text-gray-100 transition"
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2 p-3 border-b dark:border-zinc-800 overflow-x-auto">
          {["all", "mutual", "oneway", "stranger"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded text-sm font-medium transition whitespace-nowrap
                ${filter === f
                  ? "bg-gradient-to-r from-purple-500 to-cyan-400 text-white shadow-md"
                  : "bg-gray-200 dark:bg-zinc-800 text-gray-800 dark:text-gray-200 hover:bg-gradient-to-r hover:from-purple-400 hover:to-cyan-300 hover:text-white"
                }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Conversations List */}
        {filteredConversations.length === 0 && (
          <p className="p-6 text-gray-400">No conversations found</p>
        )}

        {filteredConversations.map((c) => (
          <div
            key={c._id}
            onClick={() => setActiveChat(c)}
            className={`flex items-center gap-3 p-4 border-b dark:border-zinc-800 cursor-pointer rounded-lg transition
              ${activeChat?._id === c._id
                ? "bg-gradient-to-r from-purple-100 to-cyan-100 dark:from-purple-900/30 dark:to-cyan-900/30 border-l-4 border-purple-500"
                : "hover:bg-purple-50 dark:hover:bg-zinc-800"
              }`}
          >
            <img
              src={c.otherUser.profilePic || "/avatar.png"}
              alt="profile"
              className="w-10 h-10 rounded-full object-cover border dark:border-zinc-700"
            />

            <div className="flex-1">
              <p className="font-semibold dark:text-gray-100">{c.otherUser.username}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                {c.lastMessage?.text || "Start chatting"}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Right Panel */}
      <div
        className={`
          flex-1 bg-gray-50 dark:bg-black
          ${!activeChat ? "hidden md:flex items-center justify-center" : "flex flex-col w-full"}
          pb-20 md:pb-0 transition-colors duration-300
        `}
      >
        {activeChat ? (
          <>
            {/* Chat Header - with padding for mobile top bar */}
            <div className="bg-white dark:bg-zinc-900 border-b dark:border-zinc-800 p-3 md:p-4 flex items-center gap-3 sticky top-14 md:top-0 z-40 transition-colors duration-300">
              {/* Mobile Back Button */}
              <button
                onClick={() => setActiveChat(null)}
                className="md:hidden p-2 -ml-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition"
              >
                <svg
                  className="w-6 h-6 text-gray-700 dark:text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <img
                src={activeChat.otherUser.profilePic || "/avatar.png"}
                alt=""
                className="w-10 h-10 rounded-full object-cover border dark:border-zinc-700"
              />
              <p className="font-semibold dark:text-gray-100">{activeChat.otherUser.username}</p>
            </div>

            <ChatWindow conversation={activeChat} />
          </>
        ) : (
          <p className="text-gray-400">Select a chat to start messaging</p>
        )}
      </div>
    </div>
  );
}

