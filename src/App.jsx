import { Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Challenge from "./pages/Challenge";
import Template from "./pages/Template";
import Record from "./pages/Record";
import Mypage from "./pages/Mypage";
import LeftNav from "./components/LeftNav";

function App() {
  return (
    <div>
      <LeftNav/>
      <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/login' element={<Signin />}/>
          <Route path='/register' element={<Signup />}/>
          <Route path='/challenge' element={<Challenge />}/>
          <Route path='/template' element={<Template />}/>
          <Route path='/record' element={<Record />}/>
          <Route path='/mypage' element={<Mypage />}/>
      </Routes>
    </div>
  )
}

export default App
