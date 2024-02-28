const buttonStatus = document.querySelectorAll("[button-status]");
if (buttonStatus.length > 0) {
  let url = new URL(window.location.href);
  buttonStatus.forEach((button) => {
    button.addEventListener("click", () => {
      const status = button.getAttribute("button-status");
      if (status) {
        url.searchParams.set("status", status);
      } else {
        url.searchParams.delete("status");
      }
      window.location.href = url.href;
    });
  });
}
// Form Search
const formSearch = document.querySelector("#form-search");
if (formSearch) {
  let url = new URL(window.location.href);

  formSearch.addEventListener("submit", (event) => {
    event.preventDefault();
    const keyword = event.target.elements.keyword.value;

    if (keyword) {
      url.searchParams.set("keyword", keyword);
    } else {
      url.searchParams.delete("keyword");
    }
    window.location.href = url.href;
  });
}
// End Form Search
//Pagination
const listButton = document.querySelectorAll("[button-pagination]");
if (listButton.length > 0) {
  const url = new URL(window.location.href);
  listButton.forEach((button) => {
    button.addEventListener("click", () => {
      const page = button.getAttribute("button-pagination");
      url.searchParams.set("page", page);
      window.location.href = url.href;
    });
  });
}
//End Pagination

// button-change-status
const buttonsChangeStatus = document.querySelectorAll("[button-change-status]");
if (buttonsChangeStatus.length > 0) {
  const formChangeStatus = document.querySelector("[form-change-status]");
  const path = formChangeStatus.getAttribute("data-path");

  buttonsChangeStatus.forEach((button) => {
    button.addEventListener("click", () => {
      const statusCurrent = button.getAttribute("data-status");
      const id = button.getAttribute("data-id");

      const statusChange = statusCurrent == "active" ? "inactive" : "active";

      const action = `${path}/${statusChange}/${id}?_method=PATCH`;

      formChangeStatus.action = action;

      formChangeStatus.submit();
    });
  });
}
// End button-change-status

// checkbox-multi
const checkboxMulti = document.querySelector("[checkbox-multi]");
if (checkboxMulti) {
  const inputIds = checkboxMulti.querySelectorAll("input[name='id']");
  const checkAll = checkboxMulti.querySelector("input[name='checkall']");
  checkAll.addEventListener("click", () => {
    if (checkAll.checked) {
      inputIds.forEach((button) => {
        button.checked = true;
      });
    } else {
      inputIds.forEach((button) => {
        button.checked = false;
      });
    }
  });
  inputIds.forEach((button) => {
    button.addEventListener("click", () => {
      const numberChecked = checkboxMulti.querySelectorAll(
        "input[name='id']:checked"
      );
      if (numberChecked.length == inputIds.length) {
        checkAll.checked = true;
      } else {
        checkAll.checked = false;
      }
    });
  });
}
// End checkbox-multi

// form-change-multi
const formChangeMulti = document.querySelector("[form-change-multi]");
if (formChangeMulti) {
  formChangeMulti.addEventListener("submit", (event) => {
    event.preventDefault();
    const type = event.target.elements.type.value;
    console.log(type);
    ss;
    if (type === "delete-all") {
      const isConfirm = confirm("Bạn có chắc muốn xóa những bản ghi này?");
      if (!isConfirm) {
        return;
      }
    }
    const inputsChecked = document.querySelectorAll("input[name='id']:checked");
    if (inputsChecked.length > 0) {
      const ids = [];
      const inputIds = formChangeMulti.querySelector("input[name='ids']");
      inputsChecked.forEach((input) => {
        const id = input.value;
        if (type == "change-position") {
          const position = input
            .closest("tr")
            .querySelector("input[name='position']").value;

          ids.push(`${id}-${position}`);
        } else {
          ids.push(id);
        }
      });

      inputIds.value = ids.join(", ");

      formChangeMulti.submit();
    } else {
      alert("Vui lòng chọn ít nhất một bản ghi!");
    }
  });
}
/// end form-change-multi

// delete item
const formDelete = document.querySelector("form[form-delete]");
if (formDelete) {
  const buttonsDelete = document.querySelectorAll("[button-delete]");
  const path = formDelete.getAttribute("data-path");
  if (buttonsDelete.length > 0) {
    buttonsDelete.forEach((button) => {
      const id = button.getAttribute("data-id");
      button.addEventListener("click", () => {
        const action = `${path}/${id}`;
        console.log(action);
        formDelete.action = `${action}?_method=DELETE`;
        formDelete.submit();
      });
    });
  }
}
// end delete item
// Show Alert
const showAlert = document.querySelector("[show-alert]");
if (showAlert) {
  const time = parseInt(showAlert.getAttribute("data-time"));
  setTimeout(() => {
    showAlert.classList.add("alert-hidden");
  }, time);

  const closeAlert = showAlert.querySelector("[close-alert]");
  closeAlert.addEventListener("click", () => {
    showAlert.classList.add("alert-hidden");
  });
}
// End Show Alert

//Preview image
const uploadImage = document.querySelector("[upload-image]");
if (uploadImage) {
  const uploadImageInput = uploadImage.querySelector("[upload-image-input]");
  const uploadImagePreview = uploadImage.querySelector(
    "[upload-image-preview]"
  );
  uploadImageInput.addEventListener("change", (event) => {
    const [file] = uploadImageInput.files;
    if (file) {
      uploadImagePreview.src = URL.createObjectURL(file);
    }
  });
}
//End preview image
// Sort
const sort = document.querySelector("[sort]");
if (sort) {
  let url = new URL(window.location.href);

  const sortSelect = sort.querySelector("[sort-select]");
  const sortClear = sort.querySelector("[sort-clear]");

  // Sắp xếp
  sortSelect.addEventListener("change", () => {
    const [sortKey, sortValue] = sortSelect.value.split("-");
    url.searchParams.set("sortKey", sortKey);
    url.searchParams.set("sortValue", sortValue);
    window.location.href = url.href;
  });

  // Xóa sắp xếp
  sortClear.addEventListener("click", () => {
    url.searchParams.delete("sortKey");
    url.searchParams.delete("sortValue");

    window.location.href = url.href;
  });

  // Thêm selected cho option
  const sortKey = url.searchParams.get("sortKey");
  const sortValue = url.searchParams.get("sortValue");

  if (sortKey && sortValue) {
    const string = `${sortKey}-${sortValue}`;
    const optionSelected = sortSelect.querySelector(
      `option[value="${string}"]`
    );
    optionSelected.selected = true;
    // optionSelected.setAttribute("selected", true);
  }
}
// End Sort
// Permissions
const tablePermissions = document.querySelector("[table-permissions]");
if (tablePermissions) {
  // Submit Data
  const buttonSubmit = document.querySelector("[button-submit]");
  buttonSubmit.addEventListener("click", () => {
    const roles = [];

    const rows = tablePermissions.querySelectorAll("[data-name]");
    rows.forEach((row) => {
      const name = row.getAttribute("data-name");
      const inputs = row.querySelectorAll("input");
      if (name == "id") {
        inputs.forEach((input) => {
          const id = input.value;
          roles.push({
            id: id,
            permissions: [],
          });
        });
      } else {
        inputs.forEach((input, index) => {
          if (input.checked) {
            roles[index].permissions.push(name);
          }
        });
      }
    });

    const formChangePermissions = document.querySelector(
      "[form-change-permissions]"
    );
    const inputRoles = formChangePermissions.querySelector(
      "input[name='roles']"
    );
    inputRoles.value = JSON.stringify(roles);
    formChangePermissions.submit();
  });

  // Data Default
  const divRecords = document.querySelector("[data-records]");
  if (divRecords) {
    const records = JSON.parse(divRecords.getAttribute("data-records"));
    records.forEach((record, index) => {
      console.log(record);
      const permissions = record.permissions;

      permissions.forEach((permission) => {
        const row = tablePermissions.querySelector(
          `[data-name="${permission}"]`
        );
        const input = row.querySelectorAll("input")[index];
        input.checked = true;
      });
    });
  }
}
// End Permissions
