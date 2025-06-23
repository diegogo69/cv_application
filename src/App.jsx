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
  const [cvFormData, setCvFormData] = useState(initialCvData);
  const [cvUpdated, setCvUpdated] = useState(false);
  const [eduItems, setEduItems] = useState([]);

  const updateCvPreview = () => {
    setCvUpdated(true);
    setTimeout(() => setCvUpdated(false), 1000);
  };

  const handleReset = () => {
    setCvData({});
    storage.updateDraw({});
    storage.update();
  };

  const setFormData = (form) => {
    const formData = new FormData(form);
    const cvDataObj = Object.fromEntries(formData.entries());
    // setCvData(cvDataObj);
    setCvFormData(cvDataObj);
    return cvDataObj;
  };

  const handleSubmit = (e) => {
    // formData.keys .values .entries
    e.preventDefault();
    const cvDataObj = setFormData(e.target.form);
    storage.updateDraw(cvDataObj);
    storage.update();
    updateCvPreview();
  };

  const removeEduItem = (index) => {
    const copyArr = [...eduItems]
    copyArr.splice(index, 1)
    setEduItems(copyArr);
  }

  const handleAddEdu = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target.form);
    const cvDataObj = Object.fromEntries(formData.entries());

    const eduItem = {};
    eduItem["school"] = cvDataObj["school"];
    eduItem["study-title"] = cvDataObj["study-title"];
    eduItem["study-date-from"] = cvDataObj["study-date-from"];
    eduItem["study-date-to"] = cvDataObj["study-date-to"];
    eduItem["key"] = crypto.randomUUID();
    console.log("Edu item");
    console.log(eduItem);

    setEduItems([...eduItems, eduItem]);
  };

  
  const handleEditEdu = (e, index) => {
    e.preventDefault();
    const formData = new FormData(e.target.form);
    const cvDataObj = Object.fromEntries(formData.entries());

    const eduItem = eduItems[index];
    eduItem["school"] = cvDataObj["school"];
    eduItem["study-title"] = cvDataObj["study-title"];
    eduItem["study-date-from"] = cvDataObj["study-date-from"];
    eduItem["study-date-to"] = cvDataObj["study-date-to"];
    // eduItem["key"] = crypto.randomUUID();
    console.log("Edu item");
    console.log(eduItem);

    setEduItems([...eduItems]);
  };

  return (
    <>
      <header></header>
      <main>
        <CvInfo
          handleSubmit={handleSubmit}
          handleReset={handleReset}
          handleAddEdu={handleAddEdu}
          handleEditEdu={handleEditEdu}
          removeEduItem={removeEduItem}
          setFormData={setFormData}
          eduItems={eduItems}
          cvUpdated={cvUpdated}
          cvData={cvFormData}
        ></CvInfo>
        <CvView cvData={cvData} cvUpdated={cvUpdated}></CvView>
      </main>
      <footer></footer>
    </>
  );
}

export default App;
