function GeneralInfo() {
  return (
    <section>
      <h3>General</h3>
      <ul>
        <li>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" />
        </li>
        <li>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" />
        </li>
        <li>
          <label htmlFor="tel">Phone number:</label>
          <input type="tel" id="tel" />
        </li>
      </ul>
    </section>
  );
}

function EducationalInfo() {
  return (
    <section>
      <h3>Educational Info</h3>
      <ul>
        <li>
          <label htmlFor="school">School name:</label>
          <input type="text" id="school" />
        </li>
        <li>
          <label htmlFor="study-title">Study title:</label>
          <input type="text" id="study-title" />
        </li>
        <li>
          <label htmlFor="study-date-from">From:</label>
          <input type="date" id="study-date-from" />
        </li>
        <li>
          <label htmlFor="study-date-to">To:</label>
          <input type="date" id="study-date-to" />
        </li>
      </ul>
    </section>
  )
}

function PracticalExpInfo() {
  return (
    <section>
      <h3>Practical Experience</h3>
      {/* company name, position title,
      main responsibilities of your jobs,
      date from and until when you worked */}
      <ul>
        <li>
          <label htmlFor="company-name">Company name:</label>
          <input type="text" id="company-name" />
        </li>
        <li>
          <label htmlFor="positition-title">Positition title:</label>
          <input type="text" id="positition-title" />
        </li>
        <li>
          <label htmlFor="position-date-from">From:</label>
          <input type="date" id="position-date-from" />
        </li>
        <li>
          <label htmlFor="position-date-to">To:</label>
          <input type="date" id="position-date-to" />
        </li>
      </ul>
    </section>
  )
}
export default function CvInfo() {
  return (
    <>
      <GeneralInfo />
      <EducationalInfo />
      <PracticalExpInfo />
    </>
  );
}
