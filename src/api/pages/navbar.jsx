import{Home,Search,PlusSquare,Send,Heart,User ,MoreHorizontal} from "lucide-react"
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Sidebar() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const [showMore, setShowMore] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="fixed left-0 top-0 h-screen w-56 bg-[#e6e2e2] flex flex-col py-6 px-4">
      
      <div className="mb-10 text-2xl font-bold text-purple-600 text-center">
        NetVIBE
      </div>

      <div className="flex flex-col gap-6 text-gray-800 flex-1">
        <NavItem icon={<Home />} label="Home" onClick={()=>navigate("/Home")}/>
        <NavItem icon={<Search />} label="Search" onClick={() => navigate("/search")} />
        <NavItem icon={<PlusSquare />} label="Create" onClick={()=>navigate("/create")}/>
        <NavItem icon={<Send />} label="Messages" />
        <NavItem icon={<Heart />} label="Notifications" onClick={()=>navigate("/notifications")}/>
        <NavItem
          icon={<User />}
          label="Profile"
          onClick={() => navigate(`/profile/${username}`)}
        />
      </div>


      <div className="relative">
        <NavItem
          icon={<MoreHorizontal />}
          label="More"
          onClick={() => setShowMore(!showMore)}
        />

        {showMore && (
          <div className="absolute bottom-12 left-0 w-full bg-white shadow-md rounded-md">
            <div
              onClick={handleLogout}
              className="px-4 py-2 text-red-500 hover:bg-gray-100 cursor-pointer"
            >
              Logout
            </div>
          </div>
        )}
      </div>
    </div>
  );
}



function NavItem({ icon, label ,onClick }) {
  return (
    <div onClick={onClick} className="flex items-center gap-4 cursor-pointer group">
      <div className="text-xl group-hover:text-purple-600 transition">
        {icon}
      </div>
      <span className="font-medium group-hover:text-purple-600 transition">
        {label}
      </span>
    </div>
  );
}