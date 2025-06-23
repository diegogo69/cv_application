import "../styles/cv-info.css";
import { GeneralInfo, EducationalInfo, PracticalExpInfo } from "./formSections";
import { useId } from "react";

export default function CvInfo({
  handleSubmit,
  handleReset,
  handleAddEdu,
  setFormData,
  eduItems,
  cvUpdated,
  cvData,
}) {
  const id = useId();
  return (
    <div className="cv-info">
      <form id={id}>
        <GeneralInfo cvData={cvData} />
        <EducationalInfo
          cvData={cvData}
          eduItems={eduItems}
          handleAddEdu={handleAddEdu}
          setFormData={setFormData}
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
          {cvUpdated ? "Updating..." : "Update preview"}
        </button>
      </div>
    </div>
  );
}
