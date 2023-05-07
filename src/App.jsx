import { Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

function App() {
  
  return (
    <div>
      <Routes>
          <Route path='/' element={<Home />}/>
           <Route path='/login' element={<Signin />}/>
          <Route path='/register' element={<Signup />}/>
      </Routes>
    </div>
  )
}

export default App
