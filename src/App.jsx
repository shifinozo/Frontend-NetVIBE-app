import Login from "./api/components/Loginpage";
import Profiles from "./api/components/profilepage";
import SignUp from "./api/components/SignUppage";
import Sidebar from "./api/pages/navbar";
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { Toaster } from "react-hot-toast";


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
        <Route path="/profile/:username" element={<Profiles />} />
        <Route path="/navbar" element={<Sidebar/>}/>
        <Route path="/signUp" element={<SignUp/>}/>
      </Routes>
    </BrowserRouter>
  )
}
