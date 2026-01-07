import { useEffect, useState } from "react";
import { api } from "../axios";
import Sidebar from "../pages/navbar";

export default function SearchUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
    try {
     const token = localStorage.getItem("token");
        const res = await api.get("/getAllUsers", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUsers(res.data);
      } catch (err) {
        console.error("User fetch failed", err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="flex">
      <div className="fixed left-0 top-0 w-64 h-screen bg-gray-100">
        <Sidebar />
      </div>

      <div className="ml-64 w-full p-4 space-y-4">
        {users.map((user) => (
          <div
            key={user._id}
            className="flex items-center justify-between border p-3 rounded"
          >
            <div className="flex items-center gap-4">
              <img
                src={
                  user.profilePic ||
                  "https://i.pinimg.com/736x/65/04/29/65042906985241278be17a79a7574652.jpg"
                }
                alt="profile"
                className="w-10 h-10 rounded-full object-cover"
              />

              <div>
                <p className="font-medium">{user.username}</p>
                <p className="text-sm text-gray-500">{user.bio}</p>
              </div>
            </div>

            <button className="bg-teal-500 text-white px-4 py-1 rounded">
              Follow
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
