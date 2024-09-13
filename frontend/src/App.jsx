import React from 'react';
import Navbar from './components/Navbar';  // Correct path

const App = () => {
  return (
    <div>
      <Navbar />   {/* Render the Navbar component here */}
      <h1>App</h1> {/* You can still keep the "App" text if you'd like */}
    </div>
  );
}

export default App;

