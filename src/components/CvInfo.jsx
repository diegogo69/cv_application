import "../styles/cv-info.css";
import { GeneralInfo, EducationalInfo, PracticalExpInfo } from "./formSections";
import { useId } from "react";

export default function CvInfo({
  submitCvInfo,
  clearCvData,
  addEduItem,
  saveEditEduItem,
  removeEduItem,
  setFormData,
  eduItems,
  cvUpdated,
  cvData,
  editItem,
  setEditItem,
}) {
  const id = useId();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target.form;
    const formData = new FormData(form);
    submitCvInfo(formData);
  };

  const handleReset = (e) => {
    e.preventDefault();
    const form = e.target.form;
    form.reset();
    clearCvData();
  };

  return (
    <div className="cv-info">
      <form id={id}>
        <GeneralInfo cvData={cvData} />
        <EducationalInfo
          cvData={cvData}
          eduItems={eduItems}
          addEduItem={addEduItem}
          saveEditEduItem={saveEditEduItem}
          removeEduItem={removeEduItem}
          setFormData={setFormData}
          editItem={editItem}
          setEditItem={setEditItem}
        />
        <PracticalExpInfo cvData={cvData} />
      </form>
      <div className="btn-wrapper">
        <button type="reset" form={id} onClick={handleReset}>
          Clear
        </button>
        <button
          type="submit"
          onClick={handleSubmit}
          form={id}
          disabled={cvUpdated}
        >
          {cvUpdated ? "Updating" : "Save draw"}
        </button>
      </div>
    </div>
  );
}
