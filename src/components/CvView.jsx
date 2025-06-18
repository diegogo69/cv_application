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


export default function CvView({ cvData }) {
  console.log(cvData);
  console.log(Object.entries(cvData));
  return (
    <div className="cv-viewer">
      <div className="cv-view">
        <section className="cv-general">
          <h1>{cvData.name || "Your name goes here"}</h1>
          <ul>
            <li>{cvData.email || "user@contact.com"}</li>
            <li>{cvData.tel || "555-5555-555"}</li>
          </ul>
        </section>
        <section className="cv-educational">
          <h2>Education</h2>
          <ul>
            <li>{cvData["school-title"] || "School title"}</li>
            <li>{cvData.school || "School"}</li>
            <li>
              {cvData["study-date-from"] || "Jun, 2025"} -{" "}
              {cvData["study-date-to"] || "present"}
            </li>
          </ul>
        </section>
        <section className="cv-practical">
          <h2>Experience</h2>
          <ul>
            <li>{cvData["company-name"] || "Company name"}</li>
            <li>{cvData["position-title"] || "Position title"}</li>
            <li>{cvData["postion-resp"] || "Main responsabilities"}</li>
            <li>
              {cvData["position-date-from"] || "Jun, 2025"} -{" "}
              {cvData["position-date-to"] || "present"}
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
