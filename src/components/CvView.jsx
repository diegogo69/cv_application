import "../styles/cv-view.css";

[
  "name",
  "email",
  "tel",
  "school",
  "study-title",
  "study-date-from",
  "study-date-to",
  "company-name",
  "position-title",
  "position-resp",
  "position-date-from",
  "position-date-to",
];
// {Object.entries(cvData).map(([key, value]) => [key, value])}

function CvGeneralItem({ cvData }) {
  return (
    <ul>
      <li>{cvData.email || "user@contact.com"}</li>
      <li>{cvData.tel || "555-5555-555"}</li>
    </ul>
  );
}

function CvEducationItem({ cvData }) {
  return (
    <ul>
      <li>{cvData["study-title"] || "School title"}</li>
      <li>{cvData.school || "School"}</li>
      <li>
        {cvData["study-date-from"] || "Jun, 2025"} -{" "}
        {cvData["study-date-to"] || "present"}
      </li>
    </ul>
  );
}

function CvExperienceItem({ cvData }) {
  return (
    <ul>
      <li>{cvData["company-name"] || "Company name"}</li>
      <li>{cvData["position-title"] || "Position title"}</li>
      <li>{cvData["position-resp"] || "Main responsabilities"}</li>
      <li>
        {cvData["position-date-from"] || "Jun, 2025"} -{" "}
        {cvData["position-date-to"] || "present"}
      </li>
    </ul>
  );
}

export default function CvView({ cvData }) {
  console.log(cvData);
  console.log(Object.entries(cvData));
  return (
    <div className="cv-viewer">
      <div className="cv-view">
        <section className="cv-general">
          <h1>{cvData.name || "Your name goes here"}</h1>
          <CvGeneralItem cvData={cvData} />
        </section>
        <section className="cv-educational">
          <h2>Education</h2>
          <CvEducationItem cvData={cvData} />
        </section>
        <section className="cv-practical">
          <h2>Experience</h2>
          <CvExperienceItem cvData={cvData} />
        </section>
      </div>
    </div>
  );
}
