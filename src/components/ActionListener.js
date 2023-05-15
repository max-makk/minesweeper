class ActionListener {
  constructor(mineSweeper, helper) {
    this.mineSweeper = mineSweeper;
    this.helper = helper;
  }

  handleEvent(e) {
    e.preventDefault();
    const clickedButton = e.target;
    if (clickedButton.type === 'range') {
      this.mineSweeper.numberOfMines = Number(clickedButton.value);
    } else if (clickedButton.type === 'radio') {
      if (clickedButton.value === 'Large') {
        this.mineSweeper.rows = 25;
        this.mineSweeper.columns = 25;
      } else if (clickedButton.value === 'Medium') {
        this.mineSweeper.rows = 15;
        this.mineSweeper.columns = 15;
      } else if (clickedButton.value === 'Small') {
        this.mineSweeper.rows = 10;
        this.mineSweeper.columns = 10;
      }
    }
    this.helper.newGame();
  }
}

export default ActionListener;
