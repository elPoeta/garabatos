class ToolBar {

  static toolBarDragAndDrop() {
    const dragItem = document.querySelector("#toolbar");
    const toolBar = document.querySelector("#toolbarContainer");
    let active = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;

    const dragStart = e => {
      dragItem.style.border = "3px solid #459EE2";
      dragItem.style.backgroundColor = "rgba(255, 243, 174, .75)";
      if (e.type === "touchstart") {
        initialX = e.touches[0].clientX - xOffset;
        initialY = e.touches[0].clientY - yOffset;
      } else {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
      }

      if (e.target === dragItem) {
        active = true;
      }
    };

    const dragEnd = e => {
      initialX = currentX;
      initialY = currentY;
      dragItem.style.border = "2px solid #444";
      dragItem.style.backgroundColor = "rgba(255, 243, 174, 1)";
      active = false;
    };

    const drag = e => {
      if (active && e.cancelable) {
        e.preventDefault();
        if (e.type === "touchmove") {
          currentX = e.touches[0].clientX - initialX;
          currentY = e.touches[0].clientY - initialY;
        } else {
          currentX = e.clientX - initialX;
          currentY = e.clientY - initialY;
        }

        xOffset = currentX;
        yOffset = currentY;

        setTranslate(currentX, currentY, dragItem);
      }
    };

    const setTranslate = (xPos, yPos, el) => {
      if (yPos <= -6 || yPos >= (window.innerHeight - 120)) {
        return;
      }
      if (xPos >= 5 || xPos <= -(window.innerWidth - 230)) {
        return;
      }

      el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
    };

    toolBar.addEventListener("touchstart", dragStart, false);
    toolBar.addEventListener("touchend", dragEnd, false);
    toolBar.addEventListener("touchmove", drag, false);

    toolBar.addEventListener("mousedown", dragStart, false);
    toolBar.addEventListener("mouseup", dragEnd, false);
    toolBar.addEventListener("mousemove", drag, false);
  }
}