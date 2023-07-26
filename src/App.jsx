// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { StrictMode } from "react";
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import OpRouters from './components/Routers';
import Header from './components/Header';
import Footer from "./components/Footer";


function App() {

  return (
    <>
    <div className="App">
      <Header/>
      <div className="container-fluid container-extra min-vh-100 min-vw-100">
        <OpRouters/>
      </div>
      <Footer/>
    </div>
    </>
  );

}

export default App;
