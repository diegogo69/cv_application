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

function CvGeneralItem({ cvData }) {
  return (
    <ul>
      <li>
        <div className="icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>Email</title>
            <path d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6M20 6L12 11L4 6H20M20 18H4V8L12 13L20 8V18Z" />
          </svg>
        </div>
        <div>{cvData.email || "user@contact.com"}</div>
      </li>
      <li>
        <div className="icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>Phone</title>
            <path d="M20,15.5C18.8,15.5 17.5,15.3 16.4,14.9C16.3,14.9 16.2,14.9 16.1,14.9C15.8,14.9 15.6,15 15.4,15.2L13.2,17.4C10.4,15.9 8,13.6 6.6,10.8L8.8,8.6C9.1,8.3 9.2,7.9 9,7.6C8.7,6.5 8.5,5.2 8.5,4C8.5,3.5 8,3 7.5,3H4C3.5,3 3,3.5 3,4C3,13.4 10.6,21 20,21C20.5,21 21,20.5 21,20V16.5C21,16 20.5,15.5 20,15.5M5,5H6.5C6.6,5.9 6.8,6.8 7,7.6L5.8,8.8C5.4,7.6 5.1,6.3 5,5M19,19C17.7,18.9 16.4,18.6 15.2,18.2L16.4,17C17.2,17.2 18.1,17.4 19,17.4V19Z" />
          </svg>
        </div>
        <div>{cvData.tel || "555-5555-555"}</div>
      </li>
    </ul>
  );
}

function CvEducationItem({ cvData }) {
  const section = "edu";
  const notInfoItems =
    !cvData.items[section] || cvData.items[section].length === 0;
  const infoItems = notInfoItems ? [{ key: "key" }] : cvData.items[section];

  return (
    <ul>
      {infoItems.map((eduItem) => {
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
  const notInfoItems =
    !cvData.items[section] || cvData.items[section].length === 0;
  const infoItems = notInfoItems ? [{ key: "key" }] : cvData.items[section];

  return (
    <ul>
      {infoItems.map((eduItem) => {
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
  return (
    <div className="cv-viewer">
      <div className={"cv-view" + (cvUpdated ? " cv-updated" : "")}>
        <section className="cv-general">
          <h1>{cvData.name || "Your name goes here"}</h1>
          <CvGeneralItem cvData={cvData} />
        </section>
        <section className="cv-educational">
          <div className="icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <title>Education</title>
              <path d="M12 3L1 9L5 11.18V17.18L12 21L19 17.18V11.18L21 10.09V17H23V9L12 3M18.82 9L12 12.72L5.18 9L12 5.28L18.82 9M17 16L12 18.72L7 16V12.27L12 15L17 12.27V16Z" />
            </svg>
          </div>
          <h2>Education</h2>
          <CvEducationItem cvData={cvData} />
        </section>
        <section className="cv-practical">
          <div className="icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <title>Job</title>
              <path d="M20,6C20.58,6 21.05,6.2 21.42,6.59C21.8,7 22,7.45 22,8V19C22,19.55 21.8,20 21.42,20.41C21.05,20.8 20.58,21 20,21H4C3.42,21 2.95,20.8 2.58,20.41C2.2,20 2,19.55 2,19V8C2,7.45 2.2,7 2.58,6.59C2.95,6.2 3.42,6 4,6H8V4C8,3.42 8.2,2.95 8.58,2.58C8.95,2.2 9.42,2 10,2H14C14.58,2 15.05,2.2 15.42,2.58C15.8,2.95 16,3.42 16,4V6H20M4,8V19H20V8H4M14,6V4H10V6H14Z" />
            </svg>
          </div>
          <h2>Experience</h2>
          <CvExperienceItem cvData={cvData} />
        </section>
      </div>
    </div>
  );
}
