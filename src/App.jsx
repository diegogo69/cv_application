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
  const initialCvData = cvDraw ? cvDraw : {eduItems : []};

  const [cvData, setCvData] = useState(initialCvData);
  const [cvInfoData, setCvInfoData] = useState(initialCvData);
  const [cvUpdated, setCvUpdated] = useState(false);

  const updateCvPreview = () => {
    setCvData({ ...cvInfoData });
    setCvUpdated(true);
    setTimeout(() => setCvUpdated(false), 1000);
  };

  const clearCvData = () => {
    setCvData(initialCvData);
    setCvInfoData(initialCvData);
    storage.updateDraw(initialCvData);
    storage.update();
  };

  const setFormData = (formData) => {
    const cvDataObj = Object.fromEntries(formData.entries());
    cvDataObj.eduItems = cvInfoData.eduItems
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

    const newItems = [...cvInfoData.eduItems, eduItem];
    setCvInfoData({ ...cvInfoData, eduItems: newItems }); // ############
  };

  const removeEduItem = (index) => {
    const newItems = [...cvInfoData.eduItems];
    newItems.splice(index, 1);
    setCvInfoData({ ...cvInfoData, eduItems: newItems }); // ############
  };

  const saveEditEduItem = (e, index) => {
    const formData = new FormData(e.target.form);
    // const cvDataObj = Object.fromEntries(formData.entries());
    const newItems = [...cvInfoData.eduItems]
    const eduItem = newItems[index]; // ############
    eduItem["school"] = formData.get("school");
    eduItem["study-title"] = formData.get("study-title");
    eduItem["study-date-from"] = formData.get("study-date-from");
    eduItem["study-date-to"] = formData.get("study-date-to");
    setCvInfoData({ ...cvInfoData, eduItems: newItems }); // ############
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
          eduItems={cvInfoData.eduItems} // Is it needed a eduItems prop?
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
