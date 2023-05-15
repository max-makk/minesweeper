import Frame from './Frame';
import MineField from './MineField';
import Helper from './MineSweeperHelper';
import MouseListener from './MouseListener';
import ActionListener from './ActionListener';

class MineSweeper {
  constructor() {
    this.columns = 10;
    this.rows = 10;
    this.numberOfMines = 10;

    this.frame = new Frame(this);
    this.mineButtons = [];

    this.minesRemainingLabel = document.createElement('div');
    this.minesRemainingLabel.textContent = 'Remaining:';
    this.minesFoundLabel = document.createElement('dvi');
    this.minesFoundLabel.textContent = 'Found: 0';

    this.helper = new Helper(this);
    this.mouseListener = new MouseListener(this, this.helper);
    this.actionListener = new ActionListener(this, this.helper);
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
        this.frame.addButton(currentButton);
      }
    }

    this.mineField = new MineField(this.rows, this.columns, this.numberOfMines);
  }

  addPanels() {
    const controlPanel = document.createElement('div');
    controlPanel.append(this.minesFoundLabel);
    this.minesRemainingLabel.textContent = `Remaining: ${this.mineField.getMinesRemaining()}`;
    controlPanel.append(this.minesRemainingLabel);

    this.frame.addPanel(controlPanel);
  }

  addMenu() {
    const menu = document.createElement('div');

    const labelMines = document.createElement('label');
    const inputMines = document.createElement('input');
    inputMines.setAttribute('type', 'range');
    inputMines.setAttribute('min', '10');
    inputMines.setAttribute('max', '99');
    inputMines.setAttribute('step', '1');
    inputMines.setAttribute('value', '10');
    inputMines.addEventListener('input', this.actionListener);
    labelMines.append('Mines');
    labelMines.append(inputMines);

    const options = ['Small', 'Medium', 'Large'];
    const optionsGroup = document.createElement('div');
    optionsGroup.classList.add('group');
    options.forEach((size) => {
      const labelOption = document.createElement('label');
      labelOption.append(size);
      const option = document.createElement('input');
      option.setAttribute('type', 'radio');
      option.setAttribute('value', size);
      option.setAttribute('name', 'size');
      if (size === 'Small') option.checked = true;
      option.addEventListener('change', this.actionListener);
      labelOption.append(option);
      optionsGroup.append(labelOption);
    });
    menu.append(labelMines);
    menu.append(optionsGroup);
    this.frame.addMenu(menu);
  }

  createAndShowUI() {
    this.addPanels();
    this.addMenu();
    this.frame.setVisible();
  }
}

export default MineSweeper;
