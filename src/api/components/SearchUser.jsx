


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../axios";
import Sidebar from "../pages/navbar";
import { FiSearch } from "react-icons/fi";

export default function Searchuser() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const currentUserId = localStorage.getItem("userId");

  // user fetch
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/search/users");
        setUsers(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsers();
  }, []);

  
  const handleFollow = async (userId) => {
    try {
      const res = await api.post(`/follow/${userId}`);

      setUsers((prev) =>
        prev.map((u) =>
          u._id === userId
            ? { ...u, isFollowing: res.data.following }
            : u
        )
      );
    } catch (err) {
      console.error("Follow error", err);
    }
  };

  
  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 ml-64 max-w-xl">

        <div className="sticky top-0 bg-white border-b p-4 z-10">
          <div className="relative">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 rounded-lg 
                         bg-gray-100 focus:bg-white
                         focus:outline-none focus:ring-1 focus:ring-gray-300"
            />
          </div>
        </div>

        <div className="p-4 space-y-3">
          {filteredUsers.map((user) => (
            <div
              key={user._id}
              className="flex items-center justify-between
                         px-3 py-2 rounded-lg
                         hover:bg-gray-100 transition"
            >
              <div
                onClick={() => navigate(`/user/${user._id}`)}
                className="flex items-center gap-3 cursor-pointer"
              >
                <img
                  src={user.profilePic || "/avatar.png"}
                  className="w-11 h-11 rounded-full object-cover"
                  alt=""
                />
                <span className="font-medium text-sm">
                  {user.username}
                </span>
              </div>

              {user._id !== currentUserId && (
                <button
                  onClick={() => handleFollow(user._id)}
                  className={`text-sm px-4 py-1 rounded
                    ${
                      user.isFollowing
                        ? "border text-black"
                        : "bg-blue-500 text-white"
                    }`}
                >
                  {user.isFollowing ? "Following" : "Follow"}
                </button>
              )}
            </div>
          ))}

          {filteredUsers.length === 0 && (
            <p className="text-center text-gray-400 mt-10">
              No users found
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
