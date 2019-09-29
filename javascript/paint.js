class Paint {
  constructor(id) {
    this.canvas = document.querySelector(`#${id}`);
    this.btnDraw = document.querySelector('#btnDraw');
    this.btnErase = document.querySelector('#btnErase');
    this.lineWidth = document.querySelector('#lineWidth');
    this.lineCap = document.querySelector('#lineCap');
    this.chooseColor = document.querySelector('#lineColor');
    this.btnClear = document.querySelector('#clearCanvas');
    this.xPos = document.querySelector('#xPos');
    this.yPos = document.querySelector('#yPos');
    this.ctx = this.canvas.getContext('2d');
    this.ctx.strokeStyle = "#000000";
    this.ctx.lineWith = 2;
    this.drawing = false;
    this.toolType = 'pencil';
    this.position = {
      current: { x: 0, y: 0 },
      last: { x: 0, y: 0 }
    };
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
    this.lineWidth.addEventListener('change', this.handlerLineWidth.bind(this));
    this.lineCap.addEventListener('change', this.handlerLineCap.bind(this));
    this.btnClear.addEventListener('click', this.handlerClearCanvas.bind(this));
  }

  init(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
    return this;
  }

  handlerMouseDown(e) {
    this.drawing = true;
    this.position.last = this.getCurrentMousePosition(e);
  }

  handlerMouseUp(e) {
    this.drawing = false;
  }

  handlerMouseMove(e) {
    this.position.current = this.getCurrentMousePosition(e);
  }

  getCurrentMousePosition(e) {
    const clientRect = this.canvas.getBoundingClientRect();
    const x = e.clientX - clientRect.left;
    const y = e.clientY - clientRect.top;
    this.setCoords({ x, y });
    return { x, y };
  }

  handlerTouchStart(e) {
    e.preventDefault();
    this.position.current = this.getCurrentTouchPosition(e);
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

  getCurrentTouchPosition(e) {
    const clientRect = this.canvas.getBoundingClientRect();
    const x = e.touches[0].clientX - clientRect.left;
    const y = e.touches[0].clientY - clientRect.top;
    this.setCoords({ x, y });
    return { x, y };
  }

  draw() {
    if (this.drawing) {
      this.ctx.beginPath();
      this.toolType === 'pencil' ?
        this.ctx.globalCompositeOperation = 'source-over' :
        this.ctx.globalCompositeOperation = 'destination-out';

      this.ctx.moveTo(this.position.last.x, this.position.last.y);
      this.ctx.lineTo(this.position.current.x, this.position.current.y);
      this.ctx.lineJoin = this.ctx.lineCap;
      this.ctx.stroke();
    }
    this.position.last = this.position.current;
  }

  handlerLineWidth(e) {
    this.ctx.lineWidth = e.target.value;
  }

  handlerLineCap(e) {
    this.ctx.lineCap = e.target.value;
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

  setCoords(pos) {
    this.xPos.innerHTML = Math.round(pos.x);
    this.yPos.innerHTML = Math.round(pos.y);
  }
}

new Paint('canvas').init(window.innerWidth - 20, window.innerHeight - 350);
