import { StrictMode } from 'react'

import App from './App.jsx'
import ReactDOM from 'react-dom/client'
import './index.css'
import { StateContextProvider } from './Context/index.jsx'



ReactDOM.createRoot(document.getElementById('root')).render(
  <StateContextProvider>
    <App />
  </StateContextProvider>,
)
