import Mine from './Mine';

class MineField {
  constructor(rows, columns, mines) {
    this.mineField = [...Array(rows)].map(() => Array(columns));
    this.rows = rows;
    this.columns = columns;
    this.mines = mines;
    this.minesFound = 0;
    this.minesRemaining = mines;
    this.emptiesRemaining = rows * columns - mines;
    this.init();
    this.populate(0);
  }

  init() {
    for (let i = 0; i < this.rows; i += 1) {
      for (let j = 0; j < this.columns; j += 1) {
        this.mineField[i][j] = new Mine();
      }
    }
  }

  resolveClick(x, y, left) {
    for (let i = 0; i < this.rows; i += 1) {
      for (let j = 0; j < this.columns; j += 1) {
        if (i === x && j === y) {
          const thisMine = this.mineField[i][j];
          if (left) {
            if (thisMine.getFlagState() === 'MINE') {
              return 'CONTINUE';
            }
            if (thisMine.isCleared()) {
              return 'CONTINUE';
            }
            if (thisMine.hasMine()) {
              return 'LOSE';
            }
            return this.cascade(i, j);
          }
          const state = thisMine.setFlagState();
          if (state === 'MINE') {
            this.minesFound += 1;
            this.minesRemaining -= 1;
          } else if (state === 'SUSPECT') {
            this.minesFound -= 1;
            this.minesRemaining += 1;
          }
        }
      }
    }
    return 'CONTINUE';
  }

  populate(mineCount) {
    let currentCount = mineCount;
    const mineChance = this.mines / (this.rows * this.columns);
    for (let i = 0; i < this.rows; i += 1) {
      for (let j = 0; j < this.columns; j += 1) {
        const thisMine = this.mineField[i][j];
        if (!thisMine.hasMine()) {
          if (Math.random() < mineChance) {
            thisMine.setMine();
            currentCount += 1;
            if (currentCount === this.mines) {
              return;
            }
          }
        }
      }
    }
    if (currentCount < this.mines) {
      this.populate(currentCount);
    }
  }

  getMinesFound() {
    return this.minesFound;
  }

  getMinesRemaining() {
    return this.minesRemaining;
  }

  cascade(x, y) {
    if (x < 0 || y < 0 || x >= this.rows || y >= this.columns) {
      return 'CONTINUE';
    }
    const thisMine = this.mineField[x][y];
    if (thisMine.hasMine()) {
      return 'CONTINUE';
    }
    if (!thisMine.isCleared()) {
      thisMine.clear();
      this.emptiesRemaining -= 1;
      if (this.emptiesRemaining === 0) {
        return 'WIN';
      }
    }
    if (this.countAdjacentMines(x, y) > 0) {
      return 'CONTINUE';
    }
    for (let i = x - 1; i <= (x + 1); i += 1) {
      for (let j = y - 1; j <= (y + 1); j += 1) {
        if (i < 0 || j < 0 || i >= this.rows || j >= this.columns) {
          continue;
        } else if (!this.mineField[i][j].isCleared()) {
          this.cascade(i, j);
        }
      }
    }
    return 'CONTINUE';
  }

  countAdjacentMines(x, y) {
    let count = 0;
    for (let i = x - 1; i <= (x + 1); i += 1) {
      for (let j = y - 1; j <= (y + 1); j += 1) {
        if (i === x && j === y) {
          continue;
        } else if (i < 0 || j < 0 || i >= this.rows || j >= this.columns) {
          continue;
        } else if (this.mineField[i][j].hasMine()) {
          count += 1;
        }
      }
    }
    return count;
  }

  getMineCleared(x, y) {
    return this.mineField[x][y].isCleared();
  }

  getMineFlag(x, y) {
    return this.mineField[x][y].getFlagState();
  }

  isMine(x, y) {
    return this.mineField[x][y].hasMine();
  }
}

export default MineField;
