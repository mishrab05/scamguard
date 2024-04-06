import React from 'react'
import { Routes, Route } from 'react-router-dom';

import Home from './routes/Home'
import HelpSupport from './routes/HelpSupport';
import DetectScam from './routes/Detectscam';

function App() {
  return (
    <div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/helpsupport' element={<HelpSupport />} />
          <Route path='/detectscam' element={<DetectScam />} />
        </Routes>
    </div>
  );
}

export default App;


