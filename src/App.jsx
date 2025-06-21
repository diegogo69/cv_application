import { useState } from "react";
import "./App.css";
import CvInfo from "./components/CvInfo.jsx";
import CvView from "./components/CvView.jsx";
import { storage } from "./handlers.js";

// localStorage.clear()
storage.init();
storage.parse();

function App() {
  const cvDraw = storage.loadDraw();
  let initialCvData = cvDraw ? cvDraw : {};
  const [cvData, setCvData] = useState(initialCvData);
  const [cvUpdated, setCvUpdated] = useState(false);

  const updateCvPreview = () => {
    setCvUpdated(true);
    setTimeout(() => setCvUpdated(false), 1000);
  };

  const handleReset = () => {
    setCvData({})
    storage.updateDraw({});
    storage.update();
  }
  const handleSubmit = (e) => {
    // formData.keys .values .entries
    e.preventDefault();
    const formData = new FormData(e.target);
    const cvDataObj = Object.fromEntries(formData.entries());
    setCvData(cvDataObj);
    storage.updateDraw(cvDataObj);
    storage.update();
    updateCvPreview();
  };

  return (
    <>
      <header></header>
      <main>
        <CvInfo handleSubmit={handleSubmit} handleReset={handleReset} cvUpdated={cvUpdated} cvData={cvData}></CvInfo>
        <CvView cvData={cvData} cvUpdated={cvUpdated}></CvView>
      </main>
      <footer></footer>
    </>
  );
}

export default App;
