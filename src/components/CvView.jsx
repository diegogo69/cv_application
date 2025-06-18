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
  "position-date-from",
  "position-date-to",
];

export default function CvView({ cvData }) {
  console.log(cvData);
  console.log(Object.entries(cvData));
  return (
    <>
      <h1>{cvData.name ?? "Unnamed"}</h1>
      <ul>
        {Object.entries(cvData).map(([key, value]) => {
          return <li>{key + ": " + value}</li>;
        })}
      </ul>
    </>
  );
}
