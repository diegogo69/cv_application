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
  // const notEduItems = (!cvData.eduItems || cvData.eduItems.length === 0)
  // const eduItems =  notEduItems ? [{}] : cvData.eduItems;
  const section = "edu";
  const notEduItems =
    !cvData.items[section] || cvData.items[section].length === 0;
  const eduItems = notEduItems ? [{ key: "key" }] : cvData.items[section];

  return (
    <ul>
      {eduItems.map((eduItem) => {
        return (
          <li key={eduItem.key}>
            <div>{eduItem["study-title"] || "School title"}</div>
            <div>{eduItem["school"] || "School"}</div>
            <div>
              {eduItem["study-date-from"] || "Jun, 2025"} -{" "}
              {eduItem["study-date-to"] || "present"}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function CvExperienceItem({ cvData }) {
  const section = "exp";
  const notEduItems =
    !cvData.items[section] || cvData.items[section].length === 0;
  const eduItems = notEduItems ? [{ key: "key" }] : cvData.items[section];

  return (
    <ul>
      {eduItems.map((eduItem) => {
        return (
          <li key={eduItem.key}>
            <div>{eduItem["company-name"] || "Company name"}</div>
            <div>{eduItem["position-title"] || "Position title"}</div>
            <div>{eduItem["position-resp"] || "Main responsabilities"}</div>
            <div>
              {eduItem["position-date-from"] || "Jun, 2025"} -{" "}
              {eduItem["position-date-to"] || "present"}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default function CvView({ cvData, cvUpdated }) {
  // console.log(cvData);
  // console.log(Object.entries(cvData));
  return (
    <div className="cv-viewer">
      <div className={"cv-view" + (cvUpdated ? " cv-updated" : "")}>
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
