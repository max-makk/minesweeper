class Frame {
  constructor(mineSweeper) {
    this.mineSweeper = mineSweeper;
    this.root = document.createElement('div');
    this.root.setAttribute('id', 'root');
    this.grid = document.createElement('div');
  }

  gridLayout(rows, columns) {
    this.grid.textContent = '';
    this.grid.classList = '';
    this.grid.classList.add('grid');
    if (rows === 10 && columns === 10) {
      this.grid.classList.add('small');
    } else if (rows === 15 && columns === 15) {
      this.grid.classList.add('medium');
    } else if (rows === 25 && columns === 25) {
      this.grid.classList.add('large');
    }
    this.root.append(this.grid);
  }

  addButton(button) {
    this.grid.append(button);
  }

  addPanel(panel) {
    panel.classList.add('panel');
    this.root.prepend(panel);
  }

  addMenu(menu) {
    menu.classList.add('menu');
    this.root.prepend(menu);
  }

  setVisible() {
    document.body.append(this.root);
  }

  displayResult(text) {
    const div = document.createElement('div');
    div.classList.add('alert');
    div.textContent = text;
    this.root.append(div);
    setTimeout(() => div.remove(), 1000);
  }
}

export default Frame;
