import toolState from "../store/toolState";
import Tool from "./Tool";

export default class Oval extends Tool {
    constructor(canvas, socket, id) {
        super(canvas, socket, id);
        this.listen();
    }

    listen() {
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
        this.canvas.onmousedown = this.mouseDownHandler.bind(this);
        this.canvas.onmouseup = this.mouseUpHandler.bind(this);
    }

    mouseUpHandler(e) {
        this.mouseDown = false;
        this.saved = this.canvas.toDataURL();
        this.socket.send(JSON.stringify({
            method:'draw',
            id: this.id,
            figure: {
                type: 'Oval',
                x: this.currentX,
                y: this.currentY,
                startX: this.startX,
                startY: this.startY,
                color: this.ctx.fillStyle
            }
        })) 
    }

    mouseDownHandler(e) {
       this.mouseDown = true;
       this.startX = e.pageX - e.target.offsetLeft;
       this.startY = e.pageY - e.target.offsetTop;
    }

    mouseMoveHandler(e) {
        if (this.mouseDown) {
           this.currentX = e.pageX - e.target.offsetLeft;
           this.currentY = e.pageY - e.target.offsetTop;
           this.draw(this.currentX, this.currentY);
        }
    }

    draw(x, y) {
        const img = new Image();
        img.src = this.saved;
        img.onload = async function() {
          this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
          this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
          this.ctx.beginPath();
          this.ctx.moveTo(this.startX, this.startY + (y - this.startY) / 2);
          this.ctx.bezierCurveTo(this.startX, this.startY, x, this.startY, x, this.startY + (y - this.startY) / 2);
          this.ctx.bezierCurveTo(x, y, this.startX, y, this.startX, this.startY + (y - this.startY) / 2);
          this.ctx.fill();
          this.ctx.stroke();
          this.ctx.closePath();
      }.bind(this)
    }

    static DrawOval(ctx, x, y, startX, startY) {
        ctx.beginPath();
        ctx.moveTo(startX, startY + (y - startY) / 2);
        ctx.bezierCurveTo(startX, startY, x, startY, x, startY + (y - startY) / 2);
        ctx.bezierCurveTo(x, y, startX, y, startX, startY + (y - startY) / 2);
        ctx.fill();
        ctx.stroke();
        ctx.closePath()
    }
}