import { useId } from "react";

function GeneralInfo() {
  const id = useId();
  const ids = {
    name: id + "-name",
    email: id + "-email",
    tel: id + "-tel",
  };

  return (
    <section>
      <h3>General</h3>
      <ul>
        <li>
          <label htmlFor={ids.name}>Name:</label>
          <input type="text" name="name" id={ids.name} />
        </li>
        <li>
          <label htmlFor={ids.email}>Email:</label>
          <input type="email" name="email" id={ids.email} />
        </li>
        <li>
          <label htmlFor={ids.tel}>Phone number:</label>
          <input type="tel" name="tel" id={ids.tel} />
        </li>
      </ul>
    </section>
  );
}

function EducationalInfo() {
  const id = useId();
  const ids = {
    school: id + "-school",
    studyTitle: id + "-study-title",
    studyDateFrom: id + "-study-date-from",
    studyDateTo: id + "-study-date-to",
  };
  
  return (
    <section>
      <h3>Educational Info</h3>
      <ul>
        <li>
          <label htmlFor={ids.school}>School name:</label>
          <input type="text" name="school" id={ids.school} />
        </li>
        <li>
          <label htmlFor={ids.studyTitle}>Study title:</label>
          <input type="text" name="study-title" id={ids.studyTitle} />
        </li>
        <li>
          <label htmlFor={ids.studyDateFrom}>From:</label>
          <input type="date" name="study-date-from" id={ids.studyDateFrom} />
        </li>
        <li>
          <label htmlFor={ids.studyDateTo}>To:</label>
          <input type="date" name="study-date-to" id={ids.studyDateTo} />
        </li>
      </ul>
    </section>
  );
}

function PracticalExpInfo() {
  const id = useId();
  const ids = {
    companyName: id + "-company-name",
    positionTitle: id + "-position-title",
    positionDateFrom: id + "-position-date-from",
    positionDateTo: id + "-position-date-to",
  };

  return (
    <section>
      <h3>Practical Experience</h3>
      <ul>
        <li>
          <label htmlFor={ids.companyName}>Company name:</label>
          <input type="text" name="company-name" id={ids.companyName} />
        </li>
        <li>
          <label htmlFor={ids.positionTitle}>Position title:</label>
          <input type="text" name="position-title" id={ids.positionTitle} />
        </li>
        <li>
          <label htmlFor={ids.positionDateFrom}>From:</label>
          <input
            type="date"
            name="position-date-from"
            id={ids.positionDateFrom}
          />
        </li>
        <li>
          <label htmlFor={ids.positionDateTo}>To:</label>
          <input type="date" name="position-date-to" id={ids.positionDateTo} />
        </li>
      </ul>
    </section>
  );
}

export default function CvInfo({handleSubmit}) {
  return (
    <form action={handleSubmit}>
      <GeneralInfo />
      <EducationalInfo />
      <PracticalExpInfo />
      <button type="submit">Submit</button>
    </form>
  );
}
