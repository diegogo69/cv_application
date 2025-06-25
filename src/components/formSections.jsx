import { useId } from "react";
import { useState } from "react";
import { isEmptyObject } from "../handlers";

const EDIT_ITEM_SVG = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <title>Edit</title>
    <path d="M5,3C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19H5V5H12V3H5M17.78,4C17.61,4 17.43,4.07 17.3,4.2L16.08,5.41L18.58,7.91L19.8,6.7C20.06,6.44 20.06,6 19.8,5.75L18.25,4.2C18.12,4.07 17.95,4 17.78,4M15.37,6.12L8,13.5V16H10.5L17.87,8.62L15.37,6.12Z" />
  </svg>
);
const REM_ITEM_SVG = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <title>Remove</title>
    <path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" />
  </svg>
);

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

const selectInfoItem = ({
  e,
  index,
  key,
  eduItems,
  editItem,
  setEditItem,
  setFormData,
}) => {
  const form = e.target.closest("form");
  const formData = new FormData(form);
  const formEntries = Object.fromEntries(formData.entries());

  Object.entries(eduItems[index]).forEach(([key, value]) => {
    formEntries[key] = value;
  });

  if (editItem.edu.key != key) setEditItem({ ...editItem, edu: {} });

  setFormData(formEntries);
  form.reset();
};

const handleAddInfoItem = ({ e, inputNames, setErrMsgs, addEduItem }) => {
  e.preventDefault();
  const formData = new FormData(e.target.form);
  let isValid = true;
  const errors = {};

  inputNames.forEach((name) => {
    const input = formData.get(name);
    if (!input) {
      errors[name] = true;
      isValid = false;
    } else {
      errors[name] = false;
    }
  });

  setErrMsgs({ ...errors });
  if (!isValid) return;

  addEduItem(formData);
};

const handleRemoveInfoItem = ({
  e,
  index,
  key,
  removeEduItem,
  editItem,
  setEditItem,
}) => {
  e.stopPropagation();
  removeEduItem(index);
  if (editItem.edu.key == key) setEditItem({ ...editItem, edu: {} });
};

const handleEditInfoItem = ({
  e,
  index,
  key,
  eduItems,
  editItem,
  setEditItem,
  setFormData,
}) => {
  e.stopPropagation();
  selectInfoItem({
    e,
    index,
    key,
    eduItems,
    editItem,
    setEditItem,
    setFormData,
  });
  setEditItem({ ...editItem, edu: { index, key } });
};

const cancelSaveEditItem = ({ e, setEditItem, editItem }) => {
  e.preventDefault();
  setEditItem({ ...editItem, edu: {} });
};

const handleSaveEditItem = ({ e, editItem, setEditItem, saveEditEduItem }) => {
  e.preventDefault();
  saveEditEduItem(e, editItem.edu.index);
  setEditItem({ ...editItem, edu: {} });
};

function EducationalInfo({
  cvData,
  addEduItem,
  saveEditEduItem,
  removeEduItem,
  eduItems,
  setFormData,
  editItem,
  setEditItem,
}) {
  const [errMsgs, setErrMsgs] = useState({});
  // const [defaultValues, setDefaultValues] = useState(cvData);
  // const [editItem, setEditItem] = useState({});

  const inputNames = [
    "school",
    "study-title",
    "study-date-from",
    "study-date-to",
  ];

  const id = useId();
  const ids = {
    school: id + "-school",
    studyTitle: id + "-study-title",
    studyDateFrom: id + "-study-date-from",
    studyDateTo: id + "-study-date-to",
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
            defaultValue={cvData["school"]}
          />
          <span>{errMsgs["school"] ? "A school name is required" : ""}</span>
        </li>
        <li>
          <label htmlFor={ids.studyTitle}>Study title:</label>
          <input
            type="text"
            name="study-title"
            id={ids.studyTitle}
            defaultValue={cvData["study-title"]}
          />
          {errMsgs["study-title"] && <span>A study title is required</span>}
        </li>
        <li>
          <label htmlFor={ids.studyDateFrom}>Start date:</label>
          <input
            type="month"
            name="study-date-from"
            id={ids.studyDateFrom}
            defaultValue={cvData["study-date-from"]}
          />
          {errMsgs["study-date-from"] && (
            <span>A starting date is required</span>
          )}
        </li>
        <li>
          <label htmlFor={ids.studyDateTo}>End date:</label>
          <input
            type="month"
            name="study-date-to"
            id={ids.studyDateTo}
            defaultValue={cvData["study-date-to"]}
          />
          {errMsgs["study-date-to"] && <span>An end date is required</span>}
        </li>
      </ul>
      <div className="info-items">
        {eduItems.map((eduItem, index) => {
          const key = eduItem.key;

          return (
            <div
              key={eduItem.key}
              className="info-item"
              onClick={(e) =>
                selectInfoItem({
                  e,
                  index,
                  key,
                  eduItems,
                  editItem,
                  setEditItem,
                  setFormData,
                })
              }
            >
              <header>{eduItem["study-title"]}</header>
              <div>{eduItem["school"]}</div>
              <div>
                {eduItem["study-date-from"]} - {eduItem["study-date-to"]}
              </div>
              <footer>
                <div className="item-btns">
                  <button
                    type="button"
                    onClick={(e) =>
                      handleEditInfoItem({
                        e,
                        index,
                        key,
                        eduItems,
                        editItem,
                        setEditItem,
                        setFormData,
                      })
                    }
                  >
                    {EDIT_ITEM_SVG}
                  </button>
                  <button
                    type="button"
                    onClick={(e) =>
                      handleRemoveInfoItem({
                        e,
                        index,
                        key,
                        removeEduItem,
                        editItem,
                        setEditItem,
                      })
                    }
                  >
                    {REM_ITEM_SVG}
                  </button>
                </div>
              </footer>
            </div>
          );
        })}
      </div>
      <div className="btn-wrapper">
        {isEmptyObject(editItem.edu) ? (
          <button
            type="submit"
            onClick={(e) =>
              handleAddInfoItem({ e, inputNames, setErrMsgs, addEduItem })
            }
          >
            Add
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={(e) => cancelSaveEditItem({ e, setEditItem, editItem })}
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={(e) =>
                handleSaveEditItem({
                  e,
                  editItem,
                  setEditItem,
                  saveEditEduItem,
                })
              }
            >
              Edit
            </button>
          </>
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
