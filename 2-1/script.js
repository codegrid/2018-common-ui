(function () {
  // ボタンと本体
  const openButton = document.querySelector(".js-openDrawer");
  const drawer = document.querySelector(".js-drawer");
  const closeButton = drawer.querySelector(".js-closeDrawer");
  const backdrop = drawer.querySelector(".js-backdrop");

  const rootElement = document.documentElement;
  const scrollLockModifier = "drawerOpen";

  // 現在の状態（開いていたらtrue）
  let drawerOpen = false;

  // stateは真偽値
  function changeAriaExpanded(state) {
    const value = state ? "true" : "false";
    drawer.setAttribute("aria-expanded", value);
    openButton.setAttribute("aria-expanded", value);
    closeButton.setAttribute("aria-expanded", value);
  }

  // stateは真偽値
  function changeState(state) {
    if (state === drawerOpen) {
      console.log("2回以上連続で同じ状態に変更しようとしました");
      return;
    }
    changeAriaExpanded(state);
    drawerOpen = state;
  }

  function openDrawer() {
    changeState(true);
  }

  function closeDrawer() {
    changeState(false);
  }

  function onClickOpenButton() {
    activateScrollLock();
    openDrawer();
  }

  function onClickCloseButton() {
    closeDrawer();
  }

  function activateScrollLock() {
    rootElement.classList.add(scrollLockModifier);
  }

  function deactivateScrollLock() {
    rootElement.classList.remove(scrollLockModifier);
  }

  function onTransitionendDrawer(event) {
    if (event.target !== drawer || event.propertyName !== "visibility") {
      return;
    }
    if (!drawerOpen) {
      deactivateScrollLock();
    }
  }

  openButton.addEventListener("click", onClickOpenButton, false);
  closeButton.addEventListener("click", onClickCloseButton, false);
  backdrop.addEventListener("click", onClickCloseButton, false);
  drawer.addEventListener("transitionend", onTransitionendDrawer, false);
})();
