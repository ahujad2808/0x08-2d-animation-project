class Experiment {
  // Group Details
  static rollNos = '102117155, 102117166, 102117170'
  static names = 'Pixel Pioneers(Dev Ahuja, Amisha, Satyajeet Bedi)'

  canvasSel = '#myCanvas'

  run() {

    canvasSetup(this.canvasSel)

    const animation = new Animation('animationCanvas');
    animation.draw();

  }

}
