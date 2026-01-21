
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

  // filterum searchum
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
    <div className="flex min-h-screen">
      <Sidebar />

      {/* left side */}
      <div className="w-1/3 border-r bg-white ml-60">

        <div className="p-3 border-b">
          <input
            type="text"
            placeholder="Search chats"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="flex gap-2 p-3 border-b">
          {["all", "mutual", "oneway", "stranger"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded text-sm ${
                filter === f
                  ? "bg-black text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {filteredConversations.length === 0 && (
          <p className="p-6 text-gray-400">No conversations found</p>
        )}

        {filteredConversations.map((c) => (
          <div
            key={c._id}
            onClick={() => setActiveChat(c)}
            className={`flex items-center gap-3 p-4 border-b cursor-pointer
              ${activeChat?._id === c._id ? "bg-gray-100" : "hover:bg-gray-50"}
            `}
          >
            <img
              src={c.otherUser.profilePic || "/avatar.png"}
              alt="profile"
              className="w-10 h-10 rounded-full object-cover"
            />

            <div className="flex-1">
              <p className="font-semibold">{c.otherUser.username}</p>
              <p className="text-sm text-gray-500 truncate">
                {c.lastMessage?.text || "Start chatting"}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* right side */}
      <div className="flex-1 ">
        {activeChat ? (
          <ChatWindow conversation={activeChat} />
        ) : (
          <p className="p-6 text-gray-400">Select a chat</p>
        )}
      </div>
    </div>
  );
}

