import { useId } from "react";
import { useState } from "react";

function GeneralInfo({ cvData }) {
  const { name, email, tel } = cvData;
  const id = useId();
  const ids = {
    name: id + "-name",
    email: id + "-email",
    tel: id + "-tel",
  };

  return (
    <section>
      <h2>General</h2>
      <ul>
        <li>
          <label htmlFor={ids.name}>Name:</label>
          <input type="text" name="name" id={ids.name} defaultValue={name} />
        </li>
        <li>
          <label htmlFor={ids.email}>Email:</label>
          <input
            type="email"
            name="email"
            id={ids.email}
            defaultValue={email}
          />
        </li>
        <li>
          <label htmlFor={ids.tel}>Phone number:</label>
          <input type="tel" name="tel" id={ids.tel} defaultValue={tel} />
        </li>
      </ul>
    </section>
  );
}

function EducationalInfo({
  cvData,
  addEduItem,
  saveEditEduItem,
  removeEduItem,
  eduItems,
  setFormData,
}) {
  const id = useId();
  const ids = {
    school: id + "-school",
    studyTitle: id + "-study-title",
    studyDateFrom: id + "-study-date-from",
    studyDateTo: id + "-study-date-to",
  };
  const [defaultValues, setDefaultValues] = useState(cvData);
  const [editItem, setEditItem] = useState(null);

  const selectEduItem = (e, index) => {
    const form = e.target.closest("form");
    const formData = new FormData(form);
    setFormData(formData);
    setDefaultValues(eduItems[index]);
    if (editItem != index) setEditItem(null);
    form.reset();
  }

  const handleAddEdu = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target.form);
    addEduItem(formData)
  }

  const handleRemoveEdu = (e, index) => {
    e.stopPropagation();
    removeEduItem(index);
    if (editItem == index) setEditItem(null);
  };

  const handleEditEdu = (e, index) => {
    e.stopPropagation();
    selectEduItem(e, index);
    setEditItem(index);
  };

  const handleSaveEditEdu = (e) => {
    e.preventDefault();
    saveEditEduItem(e, editItem);
    setEditItem(null);
  };

  return (
    <section>
      <h2>Educational Info</h2>
      <ul>
        <li>
          <label htmlFor={ids.school}>School name:</label>
          <input
            type="text"
            name="school"
            id={ids.school}
            defaultValue={defaultValues["school"]}
          />
        </li>
        <li>
          <label htmlFor={ids.studyTitle}>Study title:</label>
          <input
            type="text"
            name="study-title"
            id={ids.studyTitle}
            defaultValue={defaultValues["study-title"]}
          />
        </li>
        <li>
          <label htmlFor={ids.studyDateFrom}>Start date:</label>
          <input
            type="month"
            name="study-date-from"
            id={ids.studyDateFrom}
            defaultValue={defaultValues["study-date-from"]}
          />
        </li>
        <li>
          <label htmlFor={ids.studyDateTo}>End date:</label>
          <input
            type="month"
            name="study-date-to"
            id={ids.studyDateTo}
            defaultValue={defaultValues["study-date-to"]}
          />
        </li>
      </ul>
      <div className="info-items">
        {eduItems.map((eduItem, index) => {
          return (
            <div
              key={eduItem.key}
              className="info-item"
              onClick={(e) => selectEduItem(e, index)}
            >
              <header>
                {eduItem["study-title"]}
                <div className="item-btns">
                  <button type="button" onClick={(e) => handleEditEdu(e, index)}>
                    Edit
                  </button>
                  <button type="button" onClick={(e) => handleRemoveEdu(e, index)}>
                    Rem
                  </button>
                </div>
              </header>
              <div>{eduItem["school"]}</div>
              <footer>
                {eduItem["study-date-from"]} - {eduItem["study-date-to"]}
              </footer>
            </div>
          );
        })}
      </div>
      <div className="btn-wrapper">
        {editItem == null ? (
          <button type="submit" onClick={handleAddEdu}>
            Add
          </button>
        ) : (
          <button type="submit" onClick={handleSaveEditEdu}>
            Save
          </button>
        )}
      </div>
    </section>
  );
}

function PracticalExpInfo({ cvData }) {
  const id = useId();
  const ids = {
    companyName: id + "-company-name",
    positionTitle: id + "-position-title",
    positionResp: id + "-position-resp",
    positionDateFrom: id + "-position-date-from",
    positionDateTo: id + "-position-date-to",
  };

  return (
    <section>
      <h2>Practical Experience</h2>
      <ul>
        <li>
          <label htmlFor={ids.companyName}>Company name:</label>
          <input
            type="text"
            name="company-name"
            id={ids.companyName}
            defaultValue={cvData["company-name"]}
          />
        </li>
        <li>
          <label htmlFor={ids.positionTitle}>Position title:</label>
          <input
            type="text"
            name="position-title"
            id={ids.positionTitle}
            defaultValue={cvData["position-title"]}
          />
        </li>
        <li>
          <label htmlFor={ids.positionResp}>Position responsabilites:</label>
          <input
            type="text"
            name="position-resp"
            id={ids.positionResp}
            defaultValue={cvData["position-resp"]}
          />
        </li>

        <li>
          <label htmlFor={ids.positionDateFrom}>Start date:</label>
          <input
            type="month"
            name="position-date-from"
            id={ids.positionDateFrom}
            defaultValue={cvData["position-date-from"]}
          />
        </li>
        <li>
          <label htmlFor={ids.positionDateTo}>End date:</label>
          <input
            type="month"
            name="position-date-to"
            id={ids.positionDateTo}
            defaultValue={cvData["position-date-to"]}
          />
        </li>
      </ul>
    </section>
  );
}

export { GeneralInfo, EducationalInfo, PracticalExpInfo };
