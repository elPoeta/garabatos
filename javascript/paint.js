class Paint {
  constructor(id) {
    this.canvas = document.querySelector(`#${id}`);
    this.ctx = this.canvas.getContext('2d');
    this.drawing = false;
    this.mousePosition = { x: 0, y: 0 };
    this.lastPosition = this.mousePosition;
    this.canvas.addEventListener("mousedown", this.handlerMouseDown.bind(this));
  }

  init(w, h) {
    this.canvas.width = w;
    this.canvas.height = h;
    return this;
  }

  handlerMouseDown(e) {
    console.log(this);
    this.drawing = true;
    this.lastPosition = this.getMousePosition(e);
    console.log('lastpos ', this.lastPosition);
  }

  getMousePosition(e) {
    const clientRect = this.canvas.getBoundingClientRect();
    return {
      x: e.clientX - clientRect.left,
      y: e.clientY - clientRect.top
    };
  }
}
new Paint('canvas').init(720, 400);