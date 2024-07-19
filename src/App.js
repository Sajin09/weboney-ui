import logo from './logo.svg';
import './App.css';
import LoginSignup from './Components/LoginSignup/LoginSignup';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/LoginSignup/Home'

function App() {
  return (
    <div>
     
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginSignup/>}/>
        <Route path='/Home' element={<Home/>}/>
      </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
