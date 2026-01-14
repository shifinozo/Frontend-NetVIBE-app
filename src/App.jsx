import Login from "./api/components/Loginpage";
import SignUp from "./api/components/SignUppage";
import Sidebar from "./api/pages/navbar";
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { Toaster } from "react-hot-toast";
import EditProfile from "./api/components/editprofile";
import ProfilePage from "./api/components/profilepage";
import GoogleSuccess from "./api/components/GoogleSuccess";
import ProtectedRoute from "./api/components/ProtectedRoute";

import UserProfile from "./api/components/UserProfile";
import Searchuser from "./api/components/SearchUser";
import CreatePost from "./api/components/createpost";
import Homepage from "./api/pages/homepage";
import NotificationPage from "./api/components/notification";


export default function App() {
  return (
  
  <BrowserRouter>
    <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/signUp" element={<SignUp/>}/>
        <Route path="/google-success" element={<GoogleSuccess />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/Home" element={<Homepage/>}/>
        <Route path="/navbar" element={<Sidebar />} />
        <Route path="/EditProfile" element={<EditProfile />} />
        {/* <Route path="/profile/:username" element={<ProfilePage />} /> */}

        
        <Route path="/profile/:username" element={<ProfilePage />} />
        <Route path="/search" element={<Searchuser />} />
        <Route path="/user/:id" element={<UserProfile />} />

        <Route path="/create" element={<CreatePost />} />

        <Route path="/notifications" element={<NotificationPage/>} />




      </Route>
      </Routes>
    </BrowserRouter>
  )
}
