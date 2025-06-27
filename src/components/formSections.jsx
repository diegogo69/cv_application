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

const getItemData = (inputNames, formData) => {
  const itemData = {};

  inputNames.forEach((inputName) => {
    itemData[inputName] = formData.get(inputName);
  });

  return itemData;
};

const validateItemData = (itemData) => {
  const errors = {};
  let isValid = true;

  Object.entries(itemData).forEach(([key, value]) => {
    if (!value) {
      errors[key] = true;
      isValid = false;
    } else {
      errors[key] = false;
    }
  });

  return { errors, isValid };
};

const selectInfoItem = ({
  e,
  index,
  key,
  section,
  eduItems,
  editItem,
  // errMsgs,
  // setErrMsgs,
  setErrors,
  setEditItem,
  setFormData,
}) => {
  const form = e.target.closest("form");
  const formData = new FormData(form);
  const formEntries = Object.fromEntries(formData.entries());

  Object.entries(eduItems[index]).forEach(([key, value]) => {
    formEntries[key] = value;
  });

  if (editItem[section].key != key) setEditItem({ ...editItem, [section]: {} });

  // setErrMsgs({});
  setErrors({ errors: {}, section });
  setFormData(formEntries);
  form.reset();
};

const handleAddInfoItem = ({
  e,
  section,
  inputNames,
  eduItems,
  setErrors,
  addEduItem,
}) => {
  e.preventDefault();

  if (eduItems.length + 1 > 3) {
    // setErrMsgs({ "info-items-error": true });
    const errors = { "info-items-error": true };
    setErrors({ errors, section });
    return;
  }

  const formData = new FormData(e.target.form);
  const itemData = getItemData(inputNames, formData);
  const { errors, isValid } = validateItemData(itemData);

  // setErrMsgs({ ...errors });
  setErrors({ errors, section });

  if (!isValid) return;

  addEduItem(itemData, section);
};

const handleRemoveInfoItem = ({
  e,
  index,
  key,
  section,
  removeEduItem,
  editItem,
  setEditItem,
}) => {
  e.stopPropagation();
  removeEduItem(section, index);
  if (editItem[section].key == key) setEditItem({ ...editItem, [section]: {} });
};

const handleEditInfoItem = ({
  e,
  index,
  key,
  section,
  eduItems,
  editItem,
  setEditItem,
  setErrMsgs,
  setFormData,
}) => {
  e.stopPropagation();

  selectInfoItem({
    e,
    index,
    key,
    section,
    eduItems,
    editItem,
    setEditItem,
    setErrMsgs,
    setFormData,
  });

  setEditItem({ ...editItem, [section]: { index, key } });
};

const cancelSaveEditItem = ({
  e,
  section,
  editItem,
  setEditItem,
  setErrors,
}) => {
  e.preventDefault();
  // setErrMsgs({});
  setErrors({ errors: {}, section });
  setEditItem({ ...editItem, [section]: {} });
};

const handleSaveEditItem = ({
  e,
  section,
  inputNames,
  editItem,
  setErrors,
  setEditItem,
  saveEditEduItem,
}) => {
  e.preventDefault();

  const formData = new FormData(e.target.form);
  const itemData = getItemData(inputNames, formData);
  const { errors, isValid } = validateItemData(itemData);

  // setErrMsgs({ ...errors });
  setErrors({ errors, section });

  if (!isValid) return;

  const index = editItem[section].index;
  saveEditEduItem(itemData, section, index);
  setEditItem({ ...editItem, [section]: {} });
};

function EducationalInfo({
  cvData,
  addEduItem,
  saveEditEduItem,
  removeEduItem,
  setFormData,
  editItem,
  setEditItem,
  errors,
  setErrors,
}) {
  const section = "edu";
  const eduItems = cvData.items[section];
  const errMsgs = errors[section];

  // const [errMsgs, setErrMsgs] = useState({});
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

  const handlersArgs = {
    section,
    eduItems,
    editItem,
    setEditItem,
    inputNames,
    // errMsgs,
    // setErrMsgs,
    setErrors,
    setFormData,
    addEduItem,
    removeEduItem,
    saveEditEduItem,
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
        <div className="info-items-wrapper">
          {eduItems.map((eduItem, index) => {
            const key = eduItem.key;
            return (
              <div
                key={eduItem.key}
                className="info-item"
                onClick={(e) =>
                  selectInfoItem({ e, index, key, ...handlersArgs })
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
                        handleEditInfoItem({ e, index, key, ...handlersArgs })
                      }
                    >
                      {EDIT_ITEM_SVG}
                    </button>
                    <button
                      type="button"
                      onClick={(e) =>
                        handleRemoveInfoItem({ e, index, key, ...handlersArgs })
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
        {errMsgs["info-items-error"] && (
          <span>You can only add up to 3 educational items</span>
        )}
      </div>
      <div className="btn-wrapper">
        {isEmptyObject(editItem.edu) ? (
          <button
            type="submit"
            onClick={(e) => handleAddInfoItem({ e, ...handlersArgs })}
            // disabled={cvData.eduItems.length > 2}
          >
            Add
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={(e) => cancelSaveEditItem({ e, ...handlersArgs })}
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={(e) => handleSaveEditItem({ e, ...handlersArgs })}
            >
              Edit
            </button>
          </>
        )}
      </div>
    </section>
  );
}

function PracticalExpInfo({
  cvData,
  addEduItem,
  saveEditEduItem,
  removeEduItem,
  setFormData,
  editItem,
  setEditItem,
  errors,
  setErrors,
}) {
  const section = "exp";
  const eduItems = cvData.items[section];
  const errMsgs = errors[section];
  // const [errMsgs, setErrMsgs] = useState({});

  const inputNames = [
    "company-name",
    "position-title",
    "position-resp",
    "position-date-from",
    "position-date-to",
  ];

  const id = useId();
  const ids = {
    companyName: id + "-company-name",
    positionTitle: id + "-position-title",
    positionResp: id + "-position-resp",
    positionDateFrom: id + "-position-date-from",
    positionDateTo: id + "-position-date-to",
  };

  const handlersArgs = {
    section,
    eduItems,
    editItem,
    setEditItem,
    inputNames,
    setErrors,
    setFormData,
    addEduItem,
    removeEduItem,
    saveEditEduItem,
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
          {errMsgs["company-name"] && <span>A company name is required</span>}
        </li>
        <li>
          <label htmlFor={ids.positionTitle}>Position title:</label>
          <input
            type="text"
            name="position-title"
            id={ids.positionTitle}
            defaultValue={cvData["position-title"]}
          />
          {errMsgs["position-title"] && (
            <span>A position title is required</span>
          )}
        </li>
        <li>
          <label htmlFor={ids.positionResp}>Position responsabilites:</label>
          <input
            type="text"
            name="position-resp"
            id={ids.positionResp}
            defaultValue={cvData["position-resp"]}
          />
          {errMsgs["position-resp"] && (
            <span>The position responsabilities are required</span>
          )}
        </li>
        <li>
          <label htmlFor={ids.positionDateFrom}>Start date:</label>
          <input
            type="month"
            name="position-date-from"
            id={ids.positionDateFrom}
            defaultValue={cvData["position-date-from"]}
          />
          {errMsgs["position-date-from"] && (
            <span>A starting date is required</span>
          )}
        </li>
        <li>
          <label htmlFor={ids.positionDateTo}>End date:</label>
          <input
            type="month"
            name="position-date-to"
            id={ids.positionDateTo}
            defaultValue={cvData["position-date-to"]}
          />
          {errMsgs["position-date-to"] && <span>An end date is required</span>}
        </li>
      </ul>
      <div className="info-items">
        <div className="info-items-wrapper">
          {eduItems.map((eduItem, index) => {
            const key = eduItem.key;
            return (
              <div
                key={eduItem.key}
                className="info-item"
                onClick={(e) =>
                  selectInfoItem({ e, index, key, ...handlersArgs })
                }
              >
                <header>{eduItem["position-title"]}</header>
                <div>{eduItem["company-name"]}</div>
                <div>
                  {eduItem["position-date-from"]} -{" "}
                  {eduItem["position-date-to"]}
                </div>
                <footer>
                  <div className="item-btns">
                    <button
                      type="button"
                      onClick={(e) =>
                        handleEditInfoItem({ e, index, key, ...handlersArgs })
                      }
                    >
                      {EDIT_ITEM_SVG}
                    </button>
                    <button
                      type="button"
                      onClick={(e) =>
                        handleRemoveInfoItem({ e, index, key, ...handlersArgs })
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
        {errMsgs["info-items-error"] && (
          <span>You can only add up to 3 educational items</span>
        )}
      </div>
      <div className="btn-wrapper">
        {isEmptyObject(editItem.exp) ? (
          <button
            type="submit"
            onClick={(e) => handleAddInfoItem({ e, ...handlersArgs })}
            // disabled={cvData.eduItems.length > 2}
          >
            Add
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={(e) => cancelSaveEditItem({ e, ...handlersArgs })}
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={(e) => handleSaveEditItem({ e, ...handlersArgs })}
            >
              Edit
            </button>
          </>
        )}
      </div>
    </section>
  );
}

export { GeneralInfo, EducationalInfo, PracticalExpInfo };
