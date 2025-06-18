import '../styles/cv-info.css'
import { GeneralInfo, EducationalInfo, PracticalExpInfo } from "./formSections";

export default function CvInfo({ handleSubmit }) {
  return (
    <div className="cv-info">
      <form onSubmit={handleSubmit}>
        <GeneralInfo />
        <EducationalInfo />
        <PracticalExpInfo />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
