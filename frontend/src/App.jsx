import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'
import Create from './pages/Create'
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Screening from './pages/Screening';
import ResumeBuilder from './pages/ResumeBuilder';

function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/create' element={<ResumeBuilder/>} />
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/screen' element={<Screening/>} />
 
      </Routes>
      <Footer/>
    </>
  )
}

export default App
