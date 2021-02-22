const delegateEvent = (element, eventName, target, callback) => {
  let _element;

  if (isString(element)) {
    _element = document.querySelectorAll(element);
  } else {
    _element = element;
  }

  if (isNodeList(_element)) {
    _element.forEach((item) => {
      attachEvent.call(item, eventName, target, callback);
    });
  } else {
    attachEvent.call(_element, eventName, target, callback);
  }

  function attachEvent(eventName, target, callback) {
    this.addEventListener(eventName, (event) => {
      if (
        event.target.classList.contains(target.slice(1)) ||
        event.target.closest(target)
      ) {
        callback(event, event.target);
      }
    });
  }

  function isString(obj) {
    return typeof obj === "string";
  }

  function isNodeList(obj) {
    return obj instanceof NodeList;
  }
};

document.addEventListener("click", (event) => {});

document.addEventListener("DOMContentLoaded", () => {
  delegateEvent(document, "click", ".user-button", () => {
    console.log("Нажата кнопка");
  });
});
