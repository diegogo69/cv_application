function GeneralInfo() {
  return (
    <section>
      <h3>General</h3>
      <ul>
        <li>
          <label htmlFor="name">Name:</label>
          <input type="text" name="name" id="name" />
        </li>
        <li>
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" id="email" />
        </li>
        <li>
          <label htmlFor="tel">Phone number:</label>
          <input type="tel" name="tel" id="tel" />
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
          <input type="text" name="school" id="school" />
        </li>
        <li>
          <label htmlFor="study-title">Study title:</label>
          <input type="text" name="study-title" id="study-title" />
        </li>
        <li>
          <label htmlFor="study-date-from">From:</label>
          <input type="date" name="study-date-from" id="study-date-from" />
        </li>
        <li>
          <label htmlFor="study-date-to">To:</label>
          <input type="date" name="study-date-to" id="study-date-to" />
        </li>
      </ul>
    </section>
  );
}

function PracticalExpInfo() {
  return (
    <section>
      <h3>Practical Experience</h3>
      <ul>
        <li>
          <label htmlFor="company-name">Company name:</label>
          <input type="text" name="company-name" id="company-name" />
        </li>
        <li>
          <label htmlFor="positition-title">Positition title:</label>
          <input type="text" name="positition-title" id="positition-title" />
        </li>
        <li>
          <label htmlFor="position-date-from">From:</label>
          <input
            type="date"
            name="position-date-from"
            id="position-date-from"
          />
        </li>
        <li>
          <label htmlFor="position-date-to">To:</label>
          <input type="date" name="position-date-to" id="position-date-to" />
        </li>
      </ul>
    </section>
  );
}

function handleSubmit(formData) {
  console.log([...formData.keys()]);
  console.log([...formData.values()]);
}

export default function CvInfo() {
  return (
    <form action={handleSubmit}>
      <GeneralInfo />
      <EducationalInfo />
      <PracticalExpInfo />
      <button type="submit">Submit</button>
    </form>
  );
}
