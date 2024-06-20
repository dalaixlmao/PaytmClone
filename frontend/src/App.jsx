import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./coponents/Signin";
import Signup from "./coponents/Signup";
import Send from "./coponents/Send";
import Dashboard from "./coponents/Dashboard";

function App() {

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-blue-300">
        <BrowserRouter >
          <Routes>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/signin' element={<Signin/>}/>
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/send' element={<Send/>}/>
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
