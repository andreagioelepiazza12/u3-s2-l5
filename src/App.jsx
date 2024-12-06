
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Topbar from './components/Topbar';
import Provincie from './components/Provincie';
import Details from './components/Details';
import Index from './components/Index';

function App() {
  

  return (
    <Router>
      <Topbar />
      <Routes>
      <Route path="/" element={<Index/>}></Route>
        <Route path="/provincie" element={<Provincie/>}></Route>
        <Route path="/details/:cityName" element={<Details />} />
      </Routes>
    </Router>
  )
}

export default App
