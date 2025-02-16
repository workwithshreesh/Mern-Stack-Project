import './App.css';
import "/node_modules/bootstrap/dist/css/bootstrap.css"
import "/node_modules/bootstrap/dist/js/bootstrap.js"
import Navbar from "./components/navbar/Navbar"
import Home from "./components/home/Home"
import Footer from "./components/footer/Footer"
import About from "./components/about/About"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App() {
  return (
    <div className="">
      <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutus" element={<About />} />
          <Route path="/signup" element={<About />} />
          <Route path="/signin" element={<About />} />
        </Routes>
      </Router>
      {/* <Home /> */}
      {/* <About /> */}
      <Footer />
    </div>
  );
}

export default App;
