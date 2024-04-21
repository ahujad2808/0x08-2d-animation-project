class Animation {
  constructor(canvasId) {
      this.canvas = document.getElementById('myCanvas');
      this.canvas.style.backgroundImage = "url('assets/background.jpg')"; // Replacing background 
      this.canvas.style.backgroundSize = "cover";
      this.canvas.style.backgroundRepeat = "no-repeat";
      this.ctx = this.canvas.getContext('2d');

      this.ballX = 350;
      this.ballY = 540;
      this.personX = 250;
      this.personY = 500;
      this.kicking = false;
      this.kicked = false;
      this.legPosition = 0;
      this.rotationAngle = 0;
      this.stopLen;
  }

  draw() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.drawGoalPost();
      this.drawBall();
      this.drawPerson();

      requestAnimationFrame(() => this.draw());
  }

  drawGoalPost() {
      this.ctx.fillStyle = "#000000";
      this.ctx.fillRect(700, 370, 8, 200);

      this.ctx.strokeStyle = "#000000";
      this.ctx.lineWidth = 1;
      this.ctx.beginPath();
      for (let i = 0; i <= 18; i++) {
          this.ctx.moveTo(705, 370 + i * 10);
          
          this.ctx.lineTo(730 + i * 10, 570);
          
      }
   
      this.ctx.moveTo(700, 570);
      this.ctx.lineTo(900, 571);
      this.ctx.stroke();
  }

  drawBall() {
      this.ctx.save();
      this.ctx.translate(this.ballX, this.ballY);

      this.ctx.fillStyle = "#cb7d87";
      this.ctx.beginPath();
      this.ctx.rotate(this.rotationAngle * Math.PI / 180);
      this.ctx.arc(0, 0, 10, Math.PI, 0, false);
      this.ctx.fill();

      this.ctx.fillStyle = "#1470cf";
      this.ctx.beginPath();
      this.ctx.rotate(Math.PI);
      this.ctx.arc(0, 0, 10, Math.PI, 0, false);
      this.ctx.fill();

      this.ctx.restore();
  }

  drawPerson() {
    
      this.ctx.fillStyle = "#000000";

      if (!this.kicked && this.ballX < 700) {
          this.personX += 0.5;
      }

      this.ctx.beginPath();
      this.ctx.arc(this.personX + 15, this.personY - 6, 10, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.lineWidth = 3.0;
      this.ctx.fillRect(this.personX + 10, this.personY - 10, 10, 40);

      this.ctx.strokeStyle = "#000000";
      this.ctx.beginPath();
      this.ctx.moveTo(this.personX + 10, this.personY + 5);
      this.ctx.lineTo(this.personX + 0, this.personY + 20);
      this.ctx.moveTo(this.personX + 20, this.personY + 5);
      this.ctx.lineTo(this.personX + 30, this.personY + 20);
      this.ctx.stroke();

      this.ctx.beginPath();
      if(this.stopLen == 10){
          this.ctx.moveTo(this.personX + 10, this.personY + 30);
          this.ctx.lineTo(this.personX + 0, this.personY + 40);
          this.ctx.moveTo(this.personX + 20, this.personY + 30);
          this.ctx.lineTo(this.personX + 30, this.personY + 40 - (this.legPosition - 10));
      }
      else {
          if (this.legPosition <= 10) {
              this.ctx.moveTo(this.personX + 10, this.personY + 30);
              this.ctx.lineTo(this.personX + 0, this.personY + 50 - this.legPosition);
          } else {
              this.ctx.moveTo(this.personX + 10, this.personY + 30);
              this.ctx.lineTo(this.personX + 0, this.personY + 40);
              this.ctx.moveTo(this.personX + 20, this.personY + 30);
              this.ctx.lineTo(this.personX + 30, this.personY + 50 - (this.legPosition - 10));
          }
      }
      this.ctx.stroke();

      if (!this.kicked && this.ballX < 500) {
          this.legPosition += 0.75;
          if (this.legPosition >= 20) {
              this.legPosition = 0;
          }
      }

      if (this.kicked) {
          const angleInRadians = 9 * Math.PI / 180;
          const speed = 2;
          const vx = Math.cos(angleInRadians) * speed;
          const vy = Math.sin(angleInRadians) * speed;

          this.ballX += vx;
          this.ballY -= vy;
          this.rotationAngle += 5;

          if (this.ballX >= 700) {
              this.personX = 250;
              this.ballX = 350;
              this.ballY = 540;
              this.kicked = false;
              this.kicking = false;
              this.stopLen = 0;
          }
      }

      if (!this.kicking && !this.kicked && this.personX + 40 >= this.ballX) {
          this.kicking = true;
          this.kicked = true;
          this.stopLen = 10;
      }
  }
}