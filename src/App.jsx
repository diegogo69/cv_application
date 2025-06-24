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
  const [cvInfoData, setCvInfoData] = useState(initialCvData);
  const [cvUpdated, setCvUpdated] = useState(false);
  const [eduItems, setEduItems] = useState([]);

  const updateCvPreview = () => {
    setCvData({...cvInfoData})
    setCvUpdated(true);
    setTimeout(() => setCvUpdated(false), 1000);
  };

  const clearCvData = () => {
    setCvData({});
    setCvInfoData({});
    storage.updateDraw({});
    storage.update();
  };

  const setFormData = (formData) => {
    const cvDataObj = Object.fromEntries(formData.entries());
    // setCvData(cvDataObj);
    setCvInfoData(cvDataObj);
    return cvDataObj;
  };

  const submitCvInfo = (formData) => {
    // formData.keys .values .entries
    const cvDataObj = setFormData(formData);
    storage.updateDraw(cvDataObj);
    storage.update();
    updateCvPreview();
  };

  const addEduItem = (formData) => {
    // const cvDataObj = Object.fromEntries(formData.entries());

    const eduItem = {};
    eduItem["school"] = formData.get("school");
    eduItem["study-title"] = formData.get("study-title");
    eduItem["study-date-from"] = formData.get("study-date-from");
    eduItem["study-date-to"] = formData.get("study-date-to");
    eduItem["key"] = crypto.randomUUID();

    setEduItems([...eduItems, eduItem]);
  };

  const removeEduItem = (index) => {
    const copyArr = [...eduItems]
    copyArr.splice(index, 1)
    setEduItems(copyArr);
  }
  
  const saveEditEduItem = (e, index) => {
    const formData = new FormData(e.target.form);
    const cvDataObj = Object.fromEntries(formData.entries());

    const eduItem = eduItems[index];
    eduItem["school"] = cvDataObj["school"];
    eduItem["study-title"] = cvDataObj["study-title"];
    eduItem["study-date-from"] = cvDataObj["study-date-from"];
    eduItem["study-date-to"] = cvDataObj["study-date-to"];

    setEduItems([...eduItems]);
  };

  return (
    <>
      <header></header>
      <main>
        <CvInfo
          submitCvInfo={submitCvInfo}
          clearCvData={clearCvData}
          addEduItem={addEduItem}
          saveEditEduItem={saveEditEduItem}
          removeEduItem={removeEduItem}
          setFormData={setFormData}
          eduItems={eduItems}
          cvUpdated={cvUpdated}
          cvData={cvInfoData}
        ></CvInfo>
        <CvView cvData={cvData} cvUpdated={cvUpdated}></CvView>
      </main>
      <footer></footer>
    </>
  );
}

export default App;
