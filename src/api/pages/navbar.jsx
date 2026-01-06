import{Home,Search,PlusSquare,Send,Heart,User} from "lucide-react"


export default function Sidebar() {
  return (
    <div className="fixed left-0 top-0 h-screen w-56 bg-[#e6e2e2] flex flex-col py-6 px-4">
      
      
      <div className="mb-10 text-2xl font-bold text-purple-600 text-center">
        NetVIBE
      </div>

      <div className="flex flex-col gap-6 text-gray-800">
        
        <NavItem icon={<Home />} label="Home" />        
        <NavItem icon={<Search />} label="Search" />
        <NavItem icon={<PlusSquare />} label="Create" />
        <NavItem icon={<Send />} label="Messages" />
        <NavItem icon={<Heart />} label="Notifications" />
        <NavItem icon={<User />} label="Profile" />

      </div>
    </div>
  );
}

/* Reusable item */
function NavItem({ icon, label }) {
  return (
    <div className="flex items-center gap-4 cursor-pointer group">
      <div className="text-xl group-hover:text-purple-600 transition">
        {icon}
      </div>
      <span className="font-medium group-hover:text-purple-600 transition">
        {label}
      </span>
    </div>
  );
}