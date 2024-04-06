import React from 'react'
import { Routes, Route } from 'react-router-dom';

import Home from './routes/Home'
import HelpSupport from './routes/HelpSupport';
import DetectScam from './routes/DetectScam';

function App() {
  return (
    <div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/helpsupport' element={<HelpSupport />} />
          <Route path='/detectScam' element={<DetectScam />} />
        </Routes>
    </div>
  );
}

export default App;


