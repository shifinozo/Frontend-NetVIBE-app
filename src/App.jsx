import Login from "./api/components/Loginpage";
import SignUp from "./api/components/SignUppage";
import Sidebar from "./api/pages/navbar";
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { Toaster } from "react-hot-toast";
import EditProfile from "./api/components/editprofile";
import ProfilePage from "./api/components/profilepage";
import SearchUsers from "./api/components/fetchusers";
import GoogleSuccess from "./api/components/GoogleSuccess";


export default function App() {
  return (
  //  <SignUp/>
  // <Login/>
  // <Sidebar/>
  // <Profiles/>
  <BrowserRouter>
    <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/profile/:username" element={<ProfilePage />} />
        <Route path="/navbar" element={<Sidebar/>}/>
        <Route path="/signUp" element={<SignUp/>}/>
        <Route path="/EditProfile" element={<EditProfile/>}/>
        <Route path="/SearchUsers" element={<SearchUsers/>}/>
        <Route path="/google-success" element={<GoogleSuccess />} />

      </Routes>
    </BrowserRouter>
  )
}
