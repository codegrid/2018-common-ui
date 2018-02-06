(function () {
  // ボタンと本体
  const openButton = document.querySelector(".js-openDrawer");
  const drawer = document.querySelector(".js-drawer");
  const closeButton = drawer.querySelector(".js-closeDrawer");

  // 現在の状態（開いていたらtrue）
  let currentState = false;

  // valueはtrue/false
  function changeAriaExpanded(value) {
    drawer.setAttribute("aria-expanded", value);
    openButton.setAttribute("aria-expanded", value);
    closeButton.setAttribute("aria-expanded", value);
  }

  function getNextState(state) {
    const status = {
      open: true,
      close: false,
    };
    const nextState = status[state];
    if (nextState === undefined) {
      console.log("changeState()のパラメータがおかしいです");
    }
    return nextState;
  }

  // stateは文字列の"open"/"close"
  function changeState(state) {
    const nextState = getNextState(state);
    if (nextState === currentState) {
      console.log("2回以上連続で同じ状態に変更しようとしました");
      return;
    }
    currentState = nextState;
    changeAriaExpanded(nextState);
  }

  function onClickOpenButton() {
    changeState("open");
  }

  function onClickCloseButton() {
    changeState("close");
  }

  function onClickBackdrop(event) {
    if(event.target !== drawer) {
      return;
    }
    changeState("close");
  }

  openButton.addEventListener("click", onClickOpenButton, false);
  closeButton.addEventListener("click", onClickCloseButton, false);
  drawer.addEventListener("click", onClickBackdrop, false);
})();
