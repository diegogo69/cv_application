import { useState } from "react";
import "./App.css";
import CvInfo from "./components/CvInfo.jsx";
import CvView from "./components/CvView.jsx";

function App() {
  const [cvData, setCvData] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target)
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
