import "./App.css";
import 'react-toastify/dist/ReactToastify.min.css';

// import { Routes, Route } from "react-router-dom";
import {ToastContainer} from 'react-toastify';
import { Routes } from 'routes/FernRoutes';
import {
  Navbar,
  Loader
} from "./components";
import { useProduct } from "./contexts";

function App() {
  const {loader} = useProduct();
  return (
    <div className="App">
      {loader && <Loader />}
      <ToastContainer 
      style={{top:"4.5rem", right:"0"}}
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
      
      />
      <Navbar />
      <Routes />
    </div>
  );
}

export default App;
