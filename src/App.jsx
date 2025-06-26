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
    formEntries.items = cvInfoData.items;
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

  const addEduItem = (itemData, section) => {
    // const cvDataObj = Object.fromEntries(formData.entries());

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
    // const cvDataObj = Object.fromEntries(formData.entries());
    const newItems = [...cvInfoData.items[section]];
    newItems[index] = {...newItems[index], ...itemData};
    setCvInfoData({ ...cvInfoData, items: {...cvInfoData.items, [section]: newItems} }); // ############
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
        ></CvInfo>
        <CvView cvData={cvData} cvUpdated={cvUpdated}></CvView>
      </main>
      <footer></footer>
    </>
  );
}

export default App;
