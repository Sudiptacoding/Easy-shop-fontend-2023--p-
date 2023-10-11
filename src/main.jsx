import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {
  RouterProvider
} from "react-router-dom";
import router from './routes/Routers';
import Usercontext from './context/Usercontext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Usercontext>
      <RouterProvider router={router} />
    </Usercontext>
  </React.StrictMode>,
)
