import React from  'react';
// import {BrowserRouter , Routes , Route} from 'react-router-dom';
import Join from './components/Join/Join'
import Chat from './components/Chat/Chat'
// import { BrowserRouter as Router, Route } from "react-router-dom";
import {
    BrowserRouter,
    Routes,
    Route
  } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" exact  element={<Join/>} />
      <Route path="/chat" element={<Chat/>} />
    </Routes>
    </BrowserRouter>
    // <Join/>
    // <Chat/>
  );
}

// export default App;
export default App;