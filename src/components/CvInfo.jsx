import { GeneralInfo, EducationalInfo, PracticalExpInfo } from "./formSections";

export default function CvInfo({ handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      <GeneralInfo />
      <EducationalInfo />
      <PracticalExpInfo />
      <button type="submit">Submit</button>
    </form>
  );
}
