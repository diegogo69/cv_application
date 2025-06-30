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
  const cvEmpty = { items: { edu: [], exp: [] } };
  const initialCvData = cvDraw ? cvDraw : cvEmpty;

  const [cvData, setCvData] = useState(initialCvData);
  const [cvInfoData, setCvInfoData] = useState(initialCvData);
  const [cvUpdated, setCvUpdated] = useState(false);
  const [editItem, setEditItem] = useState({ edu: {}, exp: {} });
  const [errMsgs, setErrMsgs] = useState({ edu: {}, exp: {} });

  const updateCvPreview = () => {
    setCvUpdated(true);
    setTimeout(() => setCvUpdated(false), 1000);
  };

  const clearCvData = () => {
    setCvData(cvEmpty);
    setCvInfoData(cvEmpty);
    setErrMsgs({ edu: {}, exp: {} });
    storage.updateDraw(cvEmpty);
    storage.update();
  };

  const setFormData = (formEntries) => {
    const newData = { ...formEntries, items: cvInfoData.items };
    setCvInfoData(newData);
    setCvData(newData);
    return newData;
  };

  const submitCvInfo = (formEntries) => {
    const cvDataObj = setFormData(formEntries);
    storage.updateDraw(cvDataObj);
    storage.update();
    updateCvPreview();
  };

  const addEduItem = (itemData, section) => {
    const key = crypto.randomUUID();
    const eduItem = { ...itemData, key };
    const newItems = [...cvInfoData.items[section], eduItem];
    setCvInfoData({
      ...cvInfoData,
      items: { ...cvInfoData.items, [section]: newItems },
    });
  };

  const removeEduItem = (section, index) => {
    const newItems = [...cvInfoData.items[section]];
    newItems.splice(index, 1);
    setCvInfoData({
      ...cvInfoData,
      items: { ...cvInfoData.items, [section]: newItems },
    });
  };

  const saveEditEduItem = (itemData, section, index) => {
    const newItems = [...cvInfoData.items[section]];
    newItems[index] = { ...newItems[index], ...itemData };
    setCvInfoData({
      ...cvInfoData,
      items: { ...cvInfoData.items, [section]: newItems },
    });
  };

  const setErrors = ({ errors, section }) => {
    setErrMsgs({ ...errMsgs, [section]: errors });
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
          cvUpdated={cvUpdated}
          cvData={cvInfoData}
          editItem={editItem}
          setEditItem={setEditItem}
          errors={errMsgs}
          setErrors={setErrors}
        ></CvInfo>
        <CvView cvData={cvData} cvUpdated={cvUpdated}></CvView>
      </main>
      <footer></footer>
    </>
  );
}

export default App;
