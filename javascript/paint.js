class Paint {
  constructor(id) {
    this.canvas = document.querySelector(`#${id}`);
    this.ctx = this.canvas.getContext('2d');
    this.ctx.strokeStyle = "#222222";
    this.ctx.lineWith = 2;
    this.drawing = false;
    this.mousePosition = { x: 0, y: 0 };
    this.lastPosition = this.mousePosition;
    this.canvas.addEventListener("mousedown", this.handlerMouseDown.bind(this));
    this.canvas.addEventListener("mouseup", this.handlerMouseUp.bind(this));
    this.canvas.addEventListener("mousemove", this.handlerMouseMove.bind(this));
    this.canvas.addEventListener("mousemove", this.draw.bind(this));
  }

  init(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
    return this;
  }

  handlerMouseDown(e) {
    this.drawing = true;
    this.lastPosition = this.getMousePosition(e);
  }

  handlerMouseUp(e) {
    this.drawing = false;
  }

  handlerMouseMove(e) {
    this.mousePosition = this.getMousePosition(e);
  }

  getMousePosition(e) {
    const clientRect = this.canvas.getBoundingClientRect();
    return {
      x: e.clientX - clientRect.left,
      y: e.clientY - clientRect.top
    };
  }

  draw() {
    if (this.drawing) {
      this.ctx.moveTo(this.lastPosition.x, this.lastPosition.y);
      this.ctx.lineTo(this.mousePosition.x, this.mousePosition.y);
      this.ctx.stroke();
      this.lastPosition = this.mousePosition;
    }
  }
}

new Paint('canvas').init(720, 400);
