class Frame {
  constructor(mineSweeper) {
    this.mineSweeper = mineSweeper;
    this.root = document.createElement('div');
    this.root.setAttribute('id', 'root');
    this.grid = document.createElement('div');
  }

  gridLayout(rows, columns) {
    this.grid.classList.add('grid');
    this.root.append(this.grid);
  }

  add(button) {
    this.grid.append(button);
  }

  setVisible() {
    document.body.append(this.root);
  }
}

export default Frame;
