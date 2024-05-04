class TabNavigator {}

function registerEventListener(clickCallback) {
  const navElement = document.getElementById("navigation");

  navElement.addEventListener("click", (e) => {
    clickCallback(e);
  });
}

function handleItemClick(e) {
  const clickedItem = e.target;
  const contentElements = document.getElementsByClassName("content");

  for (let element of contentElements) {
    const contentIdValue = element.attributes["content-id"].value;

    if (contentIdValue === clickedItem.id) {
      element.classList.add("content-active");
    } else {
      element.classList.remove("content-active");
    }
  }
}

registerEventListener(handleItemClick);
