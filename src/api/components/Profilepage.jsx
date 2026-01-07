import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../axios";
import Sidebar from "../pages/navbar";

export default function ProfilePage() {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get(`/getUserProfile/${username}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProfile(res.data);
    } catch (err) {
      console.error("Profile fetch failed", err);
    }
  };

  fetchProfile();
}, [username]);


 
  if (!profile) {
    return <div className="min-h-screen flex items-center justify-center">User not found</div>;
  }

  const { user, stats } = profile;

  return (
    <div className="flex min-h-screen">
      
      <div className="fixed md:static w-64 h-screen bg-gray-100">
    <Sidebar />
  </div>

      <main className="flex-1 px-4 md:px-10 py-8 w-full">

        <div className="flex flex-col md:flex-row gap-10 border-b pb-8 w-full">

          <div className="flex justify-center md:justify-start">
            <img
              src={user.profilePic || "https://i.pinimg.com/736x/65/04/29/65042906985241278be17a79a7574652.jpg"}
              alt="profile"
              className="w-36 h-36 rounded-full object-cover"
            />
          </div>

         
          <div className="flex-1">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-light">{user.username}</h2>
              <button onClick={()=>navigate("/EditProfile")} className="border px-4 py-1 rounded-md text-sm font-medium">
                Edit Profile
              </button>
            </div>

            
            <div className="flex gap-6 mt-4 text-sm">
              <span>
                <strong>{stats.posts}</strong> posts
              </span>
              <span>
                <strong>{stats.followers}</strong> followers
              </span>
              <span>
                <strong>{stats.following}</strong> following
              </span>
            </div>

           
            <div className="mt-4 text-sm">
              <p className="font-medium">{user.username}</p>
              <p className="text-gray-600">{user.bio || "No bio yet"}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-12 text-sm mt-6 border-b">
          <button className="border-b-2 border-black pb-3 font-medium">
            POSTS
          </button>
        </div>

        <div className="grid grid-cols-3 gap-1 md:gap-4 mt-6 w-full">
          {[...Array(stats.posts)].map((_, i) => (
            <div
              key={i}
              className="aspect-square bg-gray-200"
            />
          ))}
        </div>

      </main>
    </div>
  );
}




