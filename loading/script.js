(function () {

  const imagesList = [
    "images/photo-1.jpg",
    "images/photo-2.jpg",
    "images/photo-3.jpg",
    "images/photo-4.jpg",
    "images/photo-5.jpg",
    "images/photo-6.jpg",
    "images/photo-7.jpg",
    "images/photo-8.jpg",
    "images/photo-9.jpg",
    "images/photo-10.jpg"
  ];

  const gallery = document.querySelector(".js-gallery");
  const progressbar = document.querySelector(".js-progressbar");
  const fragment = document.createDocumentFragment();

  const rootElement = document.documentElement;
  const scrollbarFixTargets = document.querySelectorAll(".js-scrollbarFix");
  let scrollbarFix = false;

  const count = imagesList.length;
  let current = 0;

  function initProgressbar() {
    progressbar.setAttribute("aria-valuemax", count);
  }

  function removeProgressbar() {
    const parent = progressbar.parentElement;
    parent.removeChild(progressbar);
  }

  function hideProgressbar() {
    progressbar.addEventListener("transitionend", onTransitionendProgressbar, false);
    progressbar.classList.add("hide");
  }

  function onTransitionendProgressbar(event) {
    if (event.propertyName !== "visibility") {
      return;
    }
    progressbar.removeEventListener("transitionend", onTransitionendProgressbar, false);
    deactivatePreventKeydownTabKey();
    deactivateScrollLock();
    removeProgressbar();
  }

  function updateCount() {
    current = current + 1;
    progressbar.setAttribute("aria-valuenow", current);

    if (current === count) {
      gallery.appendChild(fragment);
      hideProgressbar();
    }
  }

  function appendImageItem(url) {
    const div = document.createElement("div");
    const img = document.createElement("img");
    div.classList.add("Gallery-item");
    img.classList.add("Gallery-image");
    img.setAttribute("src", url);
    div.appendChild(img);
    fragment.appendChild(div);
  }

  function loadImage(url) {
    const img = new Image();
    img.onload = function () {
      appendImageItem(this.src);
      updateCount();
    };
    img.src = url + "?t=" + Date.now();
  }

  function loadAllImages() {
    imagesList.forEach(function (value) {
      loadImage(value);
    })
  }

  function onKeydownTabKey(event) {
    if (event.key !== "Tab") {
      return;
    }
    event.preventDefault();
  }

  function activatePreventKeydownTabKey() {
    progressbar.addEventListener("keydown", onKeydownTabKey, false);
  }

  function deactivatePreventKeydownTabKey() {
    progressbar.removeEventListener("keydown", onKeydownTabKey, false);
  }

  function onTouchMoveProgressbar(event) {
    if (event.targetTouches.length > 1) {
      return;
    }
    event.preventDefault();
  }

  function activateScrollLock() {
    addScrollbarWidth();
    rootElement.classList.add("scrollLock");
    progressbar.addEventListener("touchmove", onTouchMoveProgressbar, false);
  }

  function deactivateScrollLock() {
    removeScrollbarWidth();
    rootElement.classList.remove("scrollLock");
    progressbar.removeEventListener("touchmove", onTouchMoveProgressbar, false);
  }

  function addScrollbarMargin(value) {
    const targetsLength = scrollbarFixTargets.length;
    for (let i = 0; i < targetsLength; i++) {
      scrollbarFixTargets[i].style.marginRight = value;
    }
  }

  function addScrollbarWidth() {
    const scrollbarWidth = window.innerWidth - rootElement.clientWidth;
    if (!scrollbarWidth) {
      scrollbarFix = false;
      return;
    }
    const value = scrollbarWidth + "px";
    addScrollbarMargin(value);
    scrollbarFix = true;
  }

  function removeScrollbarWidth() {
    if (!scrollbarFix) {
      return;
    }
    addScrollbarMargin("");
  }

  initProgressbar();
  progressbar.focus();
  activatePreventKeydownTabKey();
  activateScrollLock();
  loadAllImages();

})();
