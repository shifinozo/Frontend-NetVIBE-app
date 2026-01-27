

// import { useEffect, useState, useMemo } from "react";
// import { api } from "../axios";
// import { socket } from "../socket";

// export default function ChatWindow({ conversation }) {
//   const [messages, setMessages] = useState([]);
//   const [text, setText] = useState("");
//   const [query, setQuery] = useState("");

//   const myId = localStorage.getItem("userId");

//   // ✅ SUPPORT BOTH OLD & NEW CONVERSATION STRUCTURE
//   const otherUser = useMemo(() => {
//     if (conversation.otherUser) return conversation.otherUser;

//     if (conversation.participants) {
//       return conversation.participants.find(
//         (p) => String(p._id) !== String(myId)
//       );
//     }

//     return null;
//   }, [conversation, myId]);

//   // ✅ LOAD MESSAGES + SOCKET
//   useEffect(() => {
//     if (!conversation?._id) return;

//     fetchMessages();

//     socket.emit("join-conversation", conversation._id);

//     socket.on("new-message", (msg) => {
//       if (msg.conversation === conversation._id) {
//         setMessages((prev) => [...prev, msg]);
//       }
//     });

//     return () => socket.off("new-message");
//   }, [conversation._id]);

//   const fetchMessages = async () => {
//     try {
//       const res = await api.get(`/chat/messages/${conversation._id}`);
//       setMessages(res.data);
//     } catch (err) {
//       console.error("Failed to fetch messages", err);
//     }
//   };

//   const sendMessage = async () => {
//     if (!text.trim()) return;

//     try {
//       await api.post("/chat/message", {
//         conversationId: conversation._id,
//         text,
//       });
//       setText("");
//     } catch (err) {
//       console.error("Send message failed", err);
//     }
//   };


//   const filteredMessages = messages.filter((m) =>
//     m.text.toLowerCase().includes(query.toLowerCase())
//   );

//   return (
//     <div className="flex flex-col h-full">


//       <div className="flex items-center gap-3 px-4 py-3 border-b bg-white">
//         <img
//           src={otherUser?.profilePic || "/avatar.png"}
//           alt="profile"
//           className="w-10 h-10 rounded-full object-cover"
//         />
//         <div>
//           <p className="font-semibold">{otherUser?.username || "User"}</p>
//           <p className="text-xs text-gray-500">Active</p>
//         </div>
//       </div>

//       <div className="p-3 border-b bg-white">
//         <input
//           placeholder="Search messages"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           className="w-full border rounded px-3 py-2 text-sm"
//         />
//       </div>

      
//       <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
//         {filteredMessages.length === 0 && (
//           <p className="text-center text-gray-400 text-sm">
//             No messages found
//           </p>
//         )}

//         {filteredMessages.map((m) => (
//           <div
//             key={m._id}
//             className={`mb-2 ${
//               String(m.sender._id) === String(myId)
//                 ? "text-right"
//                 : "text-left"
//             }`}
//           >
//             <span
//               className={`inline-block px-3 py-1 rounded shadow text-sm ${
//                 String(m.sender._id) === String(myId)
//                   ? "bg-blue-500 text-white"
//                   : "bg-white"
//               }`}
//             >
//               {m.text}
//             </span>
//           </div>
//         ))}
//       </div>

      
//       <div className="p-3 border-t flex gap-2 bg-white">
//         <input
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           className="flex-1 border px-3 py-2 rounded"
//           placeholder="Message..."
//         />
//         <button
//           onClick={sendMessage}
//           className="bg-blue-500 text-white px-4 rounded"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState, useMemo } from "react";
import { api } from "../axios";
import { socket } from "../socket";

export default function ChatWindow({ conversation }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [query, setQuery] = useState("");

  const myId = localStorage.getItem("userId");

  // ✅ SUPPORT BOTH OLD & NEW CONVERSATION STRUCTURE
  const otherUser = useMemo(() => {
    if (conversation?.otherUser) return conversation.otherUser;

    if (conversation?.participants) {
      return conversation.participants.find(
        (p) => String(p._id) !== String(myId)
      );
    }

    return null;
  }, [conversation, myId]);

  // ✅ LOAD MESSAGES + SOCKET
  useEffect(() => {
    if (!conversation?._id) return;

    fetchMessages();

    socket.emit("join-conversation", conversation._id);

    socket.on("new-message", (msg) => {
      if (msg.conversation === conversation._id) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    return () => socket.off("new-message");
  }, [conversation?._id]);

  const fetchMessages = async () => {
    try {
      const res = await api.get(`/chat/messages/${conversation._id}`);
      setMessages(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const sendMessage = async () => {
    if (!text.trim()) return;

    try {
      await api.post("/chat/message", {
        conversationId: conversation._id,
        text,
      });
      setText("");
    } catch (err) {
      console.error(err);
    }
  };

  const filteredMessages = messages.filter((m) =>
    m.text.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full 
      bg-white rounded-xl shadow-lg overflow-hidden">

      {/* HEADER */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200">
        <img
          src={otherUser?.profilePic || "/avatar.png"}
          alt="profile"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold text-gray-900">
            {otherUser?.username || "User"}
          </p>
          <p className="text-xs text-gray-500">Active</p>
        </div>
      </div>

      {/* SEARCH */}
      <div className="p-3 border-b border-gray-200">
        <input
          placeholder="Search messages"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-lg px-3 py-2 text-sm
            bg-white border border-gray-300
            text-gray-900
            focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-cyan-400 transition"
        />
      </div>

      {/* MESSAGES */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        {filteredMessages.length === 0 && (
          <p className="text-center text-gray-400 text-sm">
            No messages found
          </p>
        )}

        {filteredMessages.map((m) => {
          const isMe = String(m.sender._id) === String(myId);

          return (
            <div
              key={m._id}
              className={`mb-2 flex ${isMe ? "justify-end" : "justify-start"}`}
            >
              <span
                className={`max-w-xs px-4 py-2 rounded-lg text-sm shadow
                  ${
                    isMe
                      ? "bg-gradient-to-r from-purple-500 to-cyan-400 text-white"
                      : "bg-white border border-gray-300 text-gray-900"
                  }`}
              >
                {m.text}
              </span>
            </div>
          );
        })}
      </div>

      {/* INPUT */}
      <div className="p-3 border-t border-gray-200 flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Message..."
          className="flex-1 rounded-lg px-3 py-2
            bg-white border border-gray-300
            text-gray-900
            focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-cyan-400 transition"
        />
        <button
          onClick={sendMessage}
          className="px-5 rounded-lg font-medium
            bg-gradient-to-r from-purple-500 to-cyan-400
            text-white hover:opacity-90 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}

