import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import './index.css'
import './styles/omicspred.scss'
import './styles/ancestry.scss'
import 'bootstrap/dist/css/bootstrap.min.css';

// ReactDOM.createRoot(document.getElementById('content')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// )

// Default title
document.title = process.env.PROJECT_NAME;

ReactDOM.createRoot(document.getElementById('content')).render(
  <App />
)
