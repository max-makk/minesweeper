import Frame from './Frame';
import MineField from './MineField';
import Helper from './MineSweeperHelper';
import MouseListener from './MouseListener';

class MineSweeper {
  constructor() {
    this.columns = 10;
    this.rows = 10;
    this.numberOfMines = 10;

    this.frame = new Frame(this);
    this.mineButtons = [];

    this.helper = new Helper(this);
    this.mouseListener = new MouseListener(this, this.helper);
    this.init();
  }

  init() {
    this.frame.gridLayout(this.rows, this.columns);
    this.mineButtons = [...Array(this.rows)].map(() => Array(this.columns));
    for (let i = 0; i < this.rows; i += 1) {
      for (let j = 0; j < this.columns; j += 1) {
        const currentButton = document.createElement('div');
        currentButton.classList.add('btn');
        currentButton.addEventListener('click', this.mouseListener);
        currentButton.addEventListener('contextmenu', this.mouseListener);
        this.mineButtons[i][j] = currentButton;
        this.frame.add(currentButton);
      }
    }

    this.mineField = new MineField(this.rows, this.columns, this.numberOfMines);
  }

  createAndShowUI() {
    this.frame.setVisible();
  }
}

export default MineSweeper;
