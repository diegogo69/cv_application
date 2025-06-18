import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import CvInfo from "./components/CvInfo.jsx";
import CvView from "./components/CvView.jsx";

function App() {
  const [cvData, setCvData] = useState({});

  const handleSubmit = (formData) => {
    // formData.keys .values .entries
    const cvDataObj = Object.fromEntries(formData.entries());
    setCvData(cvDataObj);
  };

  return (
    <>
      <header></header>
      <main>
        <CvInfo handleSubmit={handleSubmit}></CvInfo>
        <CvView cvData={cvData}></CvView>
      </main>
      <footer></footer>
    </>
  );
}

export default App;
