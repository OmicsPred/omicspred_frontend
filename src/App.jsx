// import './App.css'
// import 'bootstrap/dist/css/bootstrap.min.css';
import OpRouters from './components/Routers';
import Header from './components/Header';
import Footer from "./components/Footer";


const App = () => {

  return (
    <div className="App">
      <Header/>
      {/* <div className="container-fluid container-extra min-vh-100 min-vw-100"> */}
      <div className="container-fluid container-extra">
        <OpRouters/>
      </div>
      <Footer/>
    </div>
  );

}

export default App;
