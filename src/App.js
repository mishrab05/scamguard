import React from 'react'; // Import React library
import { Routes, Route } from 'react-router-dom'; // Import Routes and Route components from react-router-dom
import Home from './routes/Home'; // Import Home component from the 'routes' directory
import HelpSupport from './routes/HelpSupport'; // Import HelpSupport component from the 'routes' directory
import DetectScam from './routes/Detectscam'; // Import DetectScam component from the 'routes' directory

// Define the App component
function App() {
  return (
    <div>
      {/* Render the Routes component */}
      <Routes>
        {/* Define routes for different paths */}
        <Route path='/' element={<Home />} /> {/* Render the Home component when the path is '/' */}
        <Route path='/helpsupport' element={<HelpSupport />} /> {/* Render the HelpSupport component when the path is '/helpsupport' */}
        <Route path='/detectscam' element={<DetectScam />} /> {/* Render the DetectScam component when the path is '/detectscam' */}
      </Routes>
    </div>
  );
}

export default App; // Export the App component as the default export



