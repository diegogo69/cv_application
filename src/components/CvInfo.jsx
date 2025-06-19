import "../styles/cv-info.css";
import { GeneralInfo, EducationalInfo, PracticalExpInfo } from "./formSections";

export default function CvInfo({ handleSubmit }) {
  return (
    <div className="cv-info">
      <form onSubmit={handleSubmit}>
        <GeneralInfo />
        <EducationalInfo />
        <PracticalExpInfo />
        <div className="btn-wrapper">
          <button type="submit">Update preview</button>
        </div>
      </form>
    </div>
  );
}
