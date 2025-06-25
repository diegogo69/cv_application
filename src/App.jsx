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
  const cvEmpty = { eduItems: [] };
  const initialCvData = cvDraw ? cvDraw : cvEmpty;

  const [cvData, setCvData] = useState(initialCvData);
  const [cvInfoData, setCvInfoData] = useState(initialCvData);
  const [cvUpdated, setCvUpdated] = useState(false);
  const [editItem, setEditItem] = useState({ edu: {} });

  const updateCvPreview = () => {
    setCvData({ ...cvInfoData });
    setCvUpdated(true);
    setTimeout(() => setCvUpdated(false), 1000);
  };

  const clearCvData = () => {
    setCvData(cvEmpty);
    setCvInfoData(cvEmpty);
    storage.updateDraw(cvEmpty);
    storage.update();
  };

  const setFormData = (formEntries) => {
    // const cvDataObj = Object.fromEntries(formData.entries());
    formEntries.eduItems = cvInfoData.eduItems;
    // setCvData(cvDataObj);
    setCvInfoData(formEntries);
    return formEntries;
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

  const saveEditEduItem = (formData, index) => {
    // const cvDataObj = Object.fromEntries(formData.entries());
    const newItems = [...cvInfoData.eduItems];
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
          editItem={editItem}
          setEditItem={setEditItem}
        ></CvInfo>
        <CvView cvData={cvData} cvUpdated={cvUpdated}></CvView>
      </main>
      <footer></footer>
    </>
  );
}

export default App;
