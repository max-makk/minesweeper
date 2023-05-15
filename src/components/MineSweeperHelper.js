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
        if (this.mineSweeper.mineField.getMineCleared(i, j)) {
          this.mineSweeper.mineButtons[i][j].style.backgroundColor = 'ghostwhite';
          this.mineSweeper.mineButtons[i][j].removeEventListener('click', this.mineSweeper.mouseListener);
          this.mineSweeper.mineButtons[i][j].removeEventListener('contextmenu', this.mineSweeper.mouseListener);
          const count = this.mineSweeper.mineField.countAdjacentMines(i, j);
          if (count > 0) {
            this.mineSweeper.mineButtons[i][j].textContent = count;
            this.mineSweeper.mineButtons[i][j].classList.add(`color-${count}`);
          }
        } else {
          if (this.mineSweeper.mineField.getMineFlag(i, j) === 'MINE') {
            this.mineSweeper.mineButtons[i][j].textContent = '💣';
          } else if (this.mineSweeper.mineField.getMineFlag(i, j) === 'SUSPECT') {
            this.mineSweeper.mineButtons[i][j].textContent = '?';
          } else {
            this.mineSweeper.mineButtons[i][j].textContent = '';
          }
        }
      }
    }
  }

  showAll() {
    for (let i = 0; i < this.mineSweeper.rows; i += 1) {
      for (let j = 0; j < this.mineSweeper.columns; j += 1) {
        const mine = this.mineSweeper.mineField.isMine(i, j);
        if (mine) {
          this.mineSweeper.mineButtons[i][j].textContent = '💣';
        } else {
          this.mineSweeper.mineButtons[i][j].style.backgroundColor = 'ghostwhite';
          const count = this.mineSweeper.mineField.countAdjacentMines(i, j);
          if (count > 0) {
            this.mineSweeper.mineButtons[i][j].textContent = count;
            this.mineSweeper.mineButtons[i][j].classList.add(`color-${count}`);
          }
        }
        this.mineSweeper.mineButtons[i][j].removeEventListener('click', this.mineSweeper.mouseListener);
        this.mineSweeper.mineButtons[i][j].removeEventListener('contextmenu', this.mineSweeper.mouseListener);
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
      alert('You won!');
    } else {
      alert('You lost.');
    }
  }
}

export default Helper;
