function submitForm(formId, iframeId) {
  console.log("formID: " + formId + "formId: " + formId);

  var url = document
    .getElementById(formId)
    .querySelector("input[type=url]").value;

  document.getElementById(iframeId).src = url;
}

function removeTab(tabId, event) {
  event.preventDefault();

  var tabContainerDiv = document.getElementById(tabId + "Container");
  if (tabContainerDiv) {
    tabContainerDiv.parentNode.removeChild(tabContainerDiv);
  }

  var tabContentDiv = document.getElementById(tabId + "Page");
  if (tabContentDiv) {
    tabContentDiv.parentNode.removeChild(tabContentDiv);
  }

  var tabButton = document.getElementById(tabId);
  if (tabButton) {
    tabButton.parentNode.removeChild(tabButton);
  }

  var closeButton = document.getElementById("close" + tabId);
  if (closeButton) {
    closeButton.parentNode.removeChild(closeButton);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const buttonsTabs = document.querySelectorAll(".toggle-button");
  const tab1Page = document.getElementById("tab1Page");
  let currentActivePage = tab1Page;
  tab1Page.classList.remove("hidden-tabs-pages-style");

  buttonsTabs.forEach((button) => {
    button.addEventListener("click", function () {
      const buttonId = button.id;
      const relatedPageId = `${buttonId}Page`;

      currentActivePage.classList.add("hidden-tabs-pages-style");

      const clickedPage = document.getElementById(relatedPageId);
      clickedPage.classList.remove("hidden-tabs-pages-style");

      currentActivePage = clickedPage;
    });
  });

  var tabCount = 1;

  function addNewTab() {
    tabCount++;

    var newButton = document.createElement("button");
    newButton.className = "techPack toggle-button";
    newButton.id = "tab" + tabCount;
    newButton.textContent = "New Tab";

    var closeButton = document.createElement("button");
    closeButton.textContent = "x";
    closeButton.className = "close-tab-button";
    closeButton.id = "close" + newButton.id;

    var addButton = document.getElementById("addTabButton");

    addButton.parentNode.insertBefore(newButton, addButton);

    addButton.parentNode.insertBefore(closeButton, addButton);

    var templateDiv = document.getElementById("templatePage");
    var newTabContent = templateDiv.cloneNode(true);

    var newTabContentId = "tab" + tabCount + "Page";
    var newIframeId = "iframeTab" + tabCount;

    newTabContent.id = newTabContentId;
    newTabContent.querySelector(".iframeTabPages").id = newIframeId;

    var newFormId = "urlForm" + tabCount;
    var newSubmitButtonId = "tab" + tabCount + "submit";

    newTabContent.querySelector("form").id = newFormId;
    newTabContent.querySelector("input[type=submit]").id = newSubmitButtonId;

    document.body.appendChild(newTabContent);

    newButton.addEventListener("click", function () {
      currentActivePage.classList.add("hidden-tabs-pages-style");

      const clickedPage = document.getElementById(newTabContentId);
      clickedPage.classList.remove("hidden-tabs-pages-style");

      currentActivePage = clickedPage;
    });

    closeButton.addEventListener("click", function (event) {
      removeTab(newButton.id, event);
    });

    document
      .getElementById(newFormId)
      .addEventListener("submit", function (event) {
        event.preventDefault();
        submitForm(newFormId, newIframeId);
      });
  }

  document.getElementById("addTabButton").addEventListener("click", addNewTab);

  document
    .getElementById("urlForm1")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      submitForm("urlForm1", "iframeTab1");
    });
});
