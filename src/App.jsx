import React from "react";
import { Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./shared/hooks/useLanguage";
import Home from "./pages/Home/Home";
import Upload from "./pages/Upload/Upload";

import "./sass/App.scss";

function App() {
  return (
    <div className="App">
      <LanguageProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<Upload />} />
        </Routes>
      </LanguageProvider>
    </div>
  );
}

export default App;
