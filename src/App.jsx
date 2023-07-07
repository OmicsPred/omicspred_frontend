// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { StrictMode } from "react";
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import OpRouters from './components/Routers';
import Header from './components/Header';
import Footer from "./components/Footer";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Scores from './pages/Scores';

function App() {
  // return (
  //   <StrictMode>
  //     <Header/>
  //       <main>
  //         <OpRouters/>
  //       </main>
  //     <Footer/>
  //   </StrictMode>
  // );
  return (
    <>
      <Header/>
      <div className="container-fluid container-extra min-vh-100 min-vw-100">
        <OpRouters/>
      </div>
      <Footer/>
    </>
  );

}

export default App;
