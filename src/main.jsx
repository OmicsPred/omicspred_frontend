import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ReactGA from "react-ga4";
import './styles/omicspred.scss'
import './styles/ancestry.scss'
import 'bootstrap/dist/css/bootstrap.min.css';


// Google Analytics 4
const ga4_tracking_id = process.env.GA4_TRACKING_ID
if (ga4_tracking_id) {
  ReactGA.initialize(ga4_tracking_id);
}

// Default title
document.title = process.env.PROJECT_NAME;

const root = ReactDOM.createRoot(document.getElementById('content'));
root.render(<App />)
