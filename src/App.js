import React from 'react'
import { Routes, Route } from 'react-router-dom';

import Home from './routes/Home'
import HelpSupport from './routes/HelpSupport';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/help' element={<HelpSupport />} />
      </Routes>

    </div>
  );
}

export default App;


