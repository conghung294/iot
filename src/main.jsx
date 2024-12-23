import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
// import MqttComponent from './MqttComponent.jsx';
import { RouterProvider } from 'react-router-dom';

import router from './routes.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);