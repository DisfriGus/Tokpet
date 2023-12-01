import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./Pages/Home"
import Login from "./Pages/Login"
import Signup from "./Pages/Signup"
import Profile from "./Pages/Profile"
import KeranjangBelanja from "./Pages/KeranjangBelanja"
import RiwayatBelanja from "./Pages/RiwayatBelanja"


function App() {

  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/Login" element={<Login/>}/>
          <Route path="/Signup" element={<Signup/>}/>
          <Route path="/EditProfile" element={<Profile/>}/>
          <Route path='/KeranjangBelanja' element={<KeranjangBelanja/>}/>
          <Route path='/RiwayatBelanja' element={<RiwayatBelanja/>}/>

        </Routes>
    </BrowserRouter>
  )
}

export default App
