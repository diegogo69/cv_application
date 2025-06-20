import "../styles/cv-info.css";
import { GeneralInfo, EducationalInfo, PracticalExpInfo } from "./formSections";

export default function CvInfo({ handleSubmit, cvUpdated }) {
  return (
    <div className="cv-info">
      <form onSubmit={handleSubmit}>
        <GeneralInfo />
        <EducationalInfo />
        <PracticalExpInfo />
        <div className="btn-wrapper">
          <button type="submit" disabled={cvUpdated}>
            {cvUpdated ? "Updating..." : "Update preview"}
          </button>
        </div>
      </form>
    </div>
  );
}
