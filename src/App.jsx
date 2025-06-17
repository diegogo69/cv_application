import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import CvInfo from "./components/CvInfo.jsx";
import CvView from "./components/CvView.jsx";

function App() {
  return (
    <>
      <header></header>
      <main>
        <CvInfo></CvInfo>
        <CvView></CvView>
      </main>
      <footer></footer>
    </>
  );
}

export default App;
