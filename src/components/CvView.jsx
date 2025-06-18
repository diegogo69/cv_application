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
  return (
      <>
        <h1>{cvData.name ?? "Unnamed"}</h1>
      </>
    ) 
}
