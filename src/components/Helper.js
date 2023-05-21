class Helper {
  constructor(mineSweeper) {
    this.mineSweeper = mineSweeper;
  }

  updateLabels() {
    this.mineSweeper.minesFoundLabel.textContent = `Found: ${this.mineSweeper.mineField.getMinesFound()}`;
    this.mineSweeper.minesRemainingLabel.textContent = `Remaining: ${this.mineSweeper.mineField.getMinesRemaining()}`;
  }

  updateButtons() {
    for (let i = 0; i < this.mineSweeper.rows; i += 1) {
      for (let j = 0; j < this.mineSweeper.columns; j += 1) {
        const btn = this.mineSweeper.mineButtons[i][j];
        if (this.mineSweeper.mineField.getMineCleared(i, j)) {
          btn.classList.remove('flag');
          btn.classList.remove('suspect');
          btn.style.backgroundColor = 'ghostwhite';
          btn.removeEventListener('click', this.mineSweeper.mouseListener);
          btn.removeEventListener('contextmenu', this.mineSweeper.mouseListener);
          const count = this.mineSweeper.mineField.countAdjacentMines(i, j);
          if (count > 0) {
            btn.textContent = count;
            btn.classList.add(`color-${count}`);
          }
        } else if (!this.mineSweeper.mineField.getMineCleared(i, j)) {
          if (this.mineSweeper.mineField.getMineFlag(i, j) === 'MINE') {
            btn.classList.add('flag');
            btn.classList.remove('suspect');
          } else if (this.mineSweeper.mineField.getMineFlag(i, j) === 'SUSPECT') {
            btn.classList.add('suspect');
            btn.classList.remove('flag');
          } else {
            btn.textContent = '';
            btn.classList.remove('suspect');
            btn.classList.remove('flag');
          }
        }
      }
    }
  }

  showAll() {
    for (let i = 0; i < this.mineSweeper.rows; i += 1) {
      for (let j = 0; j < this.mineSweeper.columns; j += 1) {
        const mine = this.mineSweeper.mineField.isMine(i, j);
        const btn = this.mineSweeper.mineButtons[i][j];
        btn.classList.remove('suspect');
        btn.classList.remove('flag');
        if (mine) {
          btn.classList.add('mine');
        } else {
          btn.style.backgroundColor = 'ghostwhite';
          btn.textContent = '';
          const count = this.mineSweeper.mineField.countAdjacentMines(i, j);
          if (count > 0) {
            btn.textContent = count;
            btn.classList.add(`color-${count}`);
          }
        }
        btn.removeEventListener('click', this.mineSweeper.mouseListener);
        btn.removeEventListener('contextmenu', this.mineSweeper.mouseListener);
      }
    }
  }

  newGame() {
    this.mineSweeper.init();
    this.updateLabels();
  }

  endGame(won) {
    this.showAll();
    if (won) {
      this.mineSweeper.notify('You won!');
    } else {
      this.mineSweeper.notify('You lost.');
    }
  }
}

export default Helper;
