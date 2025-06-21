import "../styles/cv-info.css";
import { GeneralInfo, EducationalInfo, PracticalExpInfo } from "./formSections";

export default function CvInfo({ handleSubmit, handleReset, cvUpdated, cvData }) {
  return (
    <div className="cv-info">
      <form onSubmit={handleSubmit}>
        <GeneralInfo cvData={cvData} />
        <EducationalInfo cvData={cvData} />
        <PracticalExpInfo cvData={cvData} />
        <div className="btn-wrapper">
          <button type="reset" onClick={handleReset}>Clear</button>
          <button type="submit" disabled={cvUpdated}>
            {cvUpdated ? "Updating..." : "Update preview"}
          </button>
        </div>
      </form>
    </div>
  );
}
