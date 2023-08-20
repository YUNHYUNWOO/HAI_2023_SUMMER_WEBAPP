import React, {useState, createContext, useEffect} from 'react';
import axios from 'axios';
import { time } from 'console';
import { v4 as uuidv4 } from 'uuid';
import { Div } from './components';
import { MainPage } from './pages/main';
import { BrowserRouter } from 'react-router-dom';
import RouteSetup from './routes/RouteSetup'
import { Provider } from "react-redux";
function App() {

  return (
      <BrowserRouter>
        <RouteSetup />
      </BrowserRouter>  
  );

}


export default App;
