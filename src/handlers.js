function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      e.name === "QuotaExceededError" &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

let storage = null;

if (storageAvailable("localStorage"))
  storage = {
    parsed: null,
    init() {
      if (localStorage.getItem("cv_app")) return;
      const cvs = { cvs: [] };
      localStorage.setItem("cv_app", JSON.stringify(cvs));
    },
    parse() {
      const ls_string = localStorage.getItem("cv_app");
      this.parsed = JSON.parse(ls_string);
    },
    update() {
      localStorage.setItem("cv_app", JSON.stringify(this.parsed));
    },
    loadDraw() {
      return this.parsed.cvs[0];
    },
    updateDraw(cv) {
      this.parsed.cvs[0] = cv;
    },
  };

export { storage };
