import Login from "./api/components/Loginpage";
import SignUp from "./api/components/SignUppage";
import Sidebar from "./api/pages/navbar";
import {BrowserRouter,Routes,Route, Navigate} from 'react-router-dom'
import { Toaster } from "react-hot-toast";
import EditProfile from "./api/components/editprofile";
import GoogleSuccess from "./api/components/GoogleSuccess";
import ProtectedRoute from "./api/components/ProtectedRoute";
import UserProfile from "./api/components/UserProfile";
import Searchuser from "./api/components/SearchUser";
import CreatePost from "./api/components/createpost";
import Homepage from "./api/pages/homepage";
import NotificationPage from "./api/components/notification";
import PostPage from "./api/pages/postpage";
import { useEffect } from "react";
import { socket } from "./api/socket";
import Messages from "./api/pages/Messagepage";
// import ProfilePage from "./api/components/profilepage";
// import ProfilePage from "./api/components/ProfilePage";
import ProfilePage from "./api/components/Profilefixcase"









export default function App() {

useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (userId && !socket.connected) {
      socket.connect();
      socket.emit("join", userId);
      console.log("🟢 Socket connected & joined:", userId);
    }

    // ✅ GLOBAL LISTENERS 
    socket.on("online-users", (users) => {
      console.log("🟢 Online users:", users);
    });

    return () => {
      // ❌ DO NOT disconnect socket here
      socket.off("online-users");
    };
  }, []);


    const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? <Navigate to="/home" replace /> : children;
};

  return (
  
  <BrowserRouter>
    <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<PublicRoute><Login/></PublicRoute>}/>
        <Route path="/signUp" element={<SignUp/>}/>
        <Route path="/google-success" element={<GoogleSuccess />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<Homepage/>}/>
        <Route path="/navbar" element={<Sidebar />} />
        <Route path="/editProfile" element={<EditProfile />} />
        

        
        <Route path="/profile/:username" element={<ProfilePage />} />
        <Route path="/search" element={<Searchuser />} />
        <Route path="/user/:id" element={<UserProfile />} />

        <Route path="/create" element={<CreatePost />} />

        <Route path="/notifications" element={<NotificationPage/>} />

        <Route path="/posts/:postId" element={<PostPage />} />

        <Route path="/messages" element={<Messages />} />






      </Route>
      </Routes>
    </BrowserRouter>
  )
}
