import React, { useState } from "react";
import LoadingScreen from "./pages/LoadingScreen";
import Desktop from "./components/Desktop";
import "./App.css";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <div className="App">
      <div className="crt-overlay">
        <div className="scanline"></div>
      </div>
      {isLoading ? (
        <LoadingScreen onComplete={handleLoadingComplete} />
      ) : (
        <Desktop />
      )}
    </div>
  );
}

export default App;
