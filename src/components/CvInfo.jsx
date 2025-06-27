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
  cvUpdated,
  cvData,
  editItem,
  setEditItem,
  errors,
  setErrors,
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
    clearCvData();
    form.reset();
  };

  return (
    <div className="cv-info">
      <form id={id}>
        <GeneralInfo cvData={cvData} />
        <EducationalInfo
          cvData={cvData}
          addEduItem={addEduItem}
          saveEditEduItem={saveEditEduItem}
          removeEduItem={removeEduItem}
          setFormData={setFormData}
          editItem={editItem}
          setEditItem={setEditItem}
          errors={errors}
          setErrors={setErrors}
        />
        <PracticalExpInfo
          cvData={cvData}
          addEduItem={addEduItem}
          saveEditEduItem={saveEditEduItem}
          removeEduItem={removeEduItem}
          setFormData={setFormData}
          editItem={editItem}
          setEditItem={setEditItem}
          errors={errors}
          setErrors={setErrors}
        />
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
