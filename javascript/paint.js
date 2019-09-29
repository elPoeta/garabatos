class Paint {
  constructor(id) {
    this.canvas = document.querySelector(`#${id}`);
    this.btnDraw = document.querySelector('#btnDraw');
    this.btnErase = document.querySelector('#btnErase');
    this.chooseColor = document.querySelector('#lineColor');
    this.btnClear = document.querySelector('#clearCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.ctx.strokeStyle = "#222222";
    this.ctx.lineWith = 2;
    this.drawing = false;
    this.toolType = 'pencil';
    this.mousePosition = { x: 0, y: 0 };
    this.lastPosition = this.mousePosition;
    this.canvas.addEventListener("mousedown", this.handlerMouseDown.bind(this));
    this.canvas.addEventListener("mouseup", this.handlerMouseUp.bind(this));
    this.canvas.addEventListener("mousemove", this.handlerMouseMove.bind(this));
    this.canvas.addEventListener("mousemove", this.draw.bind(this));
    this.canvas.addEventListener("touchstart", this.handlerTouchStart.bind(this));
    this.canvas.addEventListener("touchend", this.handlerTouchEnd.bind(this));
    this.canvas.addEventListener("touchmove", this.handlerTouchMove.bind(this));
    this.canvas.addEventListener("touchmove", this.draw.bind(this));
    this.btnDraw.addEventListener('click', this.handlerToogleTool.bind(this));
    this.btnErase.addEventListener('click', this.handlerToogleTool.bind(this));
    this.chooseColor.addEventListener('change', this.hanlderChangeColor.bind(this));
    this.btnClear.addEventListener('click', this.handlerClearCanvas.bind(this));
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

  handlerTouchStart(e) {
    e.preventDefault();
    this.mousePosition = this.getTouchPosition(e);
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent("mousedown", {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    this.canvas.dispatchEvent(mouseEvent);
  }

  handlerTouchEnd(e) {
    e.preventDefault();
    const mouseEvent = new MouseEvent("mouseup", {});
    this.canvas.dispatchEvent(mouseEvent);
  }

  handlerTouchMove(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent("mousemove", {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    this.canvas.dispatchEvent(mouseEvent);
  }

  getTouchPosition(e) {
    const clientRect = this.canvas.getBoundingClientRect();
    return {
      x: e.touches[0].clientX - clientRect.left,
      y: e.touches[0].clientY - clientRect.top
    };
  }

  draw() {
    if (this.drawing) {
      this.ctx.beginPath();
      if (this.toolType === 'pencil') {
        this.ctx.globalCompositeOperation = 'source-over';
        this.ctx.lineWidth = 2;
      } else {
        this.ctx.globalCompositeOperation = 'destination-out';
        this.ctx.lineWidth = 5;
      }

      this.ctx.moveTo(this.lastPosition.x, this.lastPosition.y);
      this.ctx.lineTo(this.mousePosition.x, this.mousePosition.y);
      this.ctx.lineJoin = this.ctx.lineCap = 'round';
      this.ctx.stroke();
    }
    this.lastPosition = this.mousePosition;
  }

  handlerToogleTool(e) {
    let tool = 'eraser';
    if (e.target.getAttribute('id') == 'btnDraw') {
      tool = 'pencil';
      this.canvas.classList.replace('eraser', 'pencil')
    } else {
      this.canvas.classList.replace('pencil', 'eraser')
    }
    this.setTool(tool);
  }

  setTool(tool) {
    this.toolType = tool;
  }

  hanlderChangeColor(e) {
    this.ctx.strokeStyle = e.target.value;
  }

  handlerClearCanvas(e) {
    this.canvas.width = this.canvas.width;
    this.chooseColor.value = '#000000';

  }
}

new Paint('canvas').init(window.innerWidth - 20, window.innerHeight - 350);
