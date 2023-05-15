class MouseListener {
  constructor(mineSweeper, helper) {
    this.mineSweeper = mineSweeper;
    this.helper = helper;
  }

  handleEvent(e) {
    e.preventDefault();
    const clickedButton = e.target;
    for (let i = 0; i < this.mineSweeper.rows; i += 1) {
      for (let j = 0; j < this.mineSweeper.columns; j += 1) {
        if (clickedButton === this.mineSweeper.mineButtons[i][j]) {
          let state = '';
          if (e.button === 0) {
            state = this.mineSweeper.mineField.resolveClick(i, j, true);
            if (state === 'CONTINUE') {
              if (this.mineSweeper.mineField.getMineFlag(i, j) === 'UNKNOWN') {
                e.target.removeEventListener('click', this);
              }
            }
          } else {
            state = this.mineSweeper.mineField.resolveClick(i, j, false);
          }
          if (state === 'WIN') {
            this.helper.endGame(true);
          } else if (state === 'LOSE') {
            this.helper.endGame(false);
          } else {
            this.helper.updateButtons();
          }
        }
      }
    }
    this.helper.updateLabels();
  }
}

export default MouseListener;
