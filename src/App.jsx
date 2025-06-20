import { useState } from "react";
import "./App.css";
import CvInfo from "./components/CvInfo.jsx";
import CvView from "./components/CvView.jsx";

function App() {
  const [cvData, setCvData] = useState({});
  const [cvUpdated, setCvUpdated] = useState(false)
  
  const updateCvPreview = () => {
    setCvUpdated(true);
    setTimeout(() => setCvUpdated(false), 1000)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target)
    // formData.keys .values .entries 
    const cvDataObj = Object.fromEntries(formData.entries());
    setCvData(cvDataObj);
    updateCvPreview()
  };

  return (
    <>
      <header></header>
      <main>
        <CvInfo handleSubmit={handleSubmit} cvUpdated={cvUpdated}></CvInfo>
        <CvView cvData={cvData} cvUpdated={cvUpdated}></CvView>
      </main>
      <footer></footer>
    </>
  );
}

export default App;
