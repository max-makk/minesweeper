class Mine {
  constructor() {
    this.cleared = false;
    this.mine = false;
    this.flag = 'UNKNOWN';
  }

  hasMine() {
    return this.mine;
  }

  setMine() {
    this.mine = true;
  }

  isCleared() {
    return this.cleared;
  }

  clear() {
    this.cleared = true;
  }

  getFlagState() {
    return this.flag;
  }

  setFlagState() {
    if (this.flag === 'UNKNOWN') {
      this.flag = 'MINE';
      return this.flag;
    }
    if (this.flag === 'MINE') {
      this.flag = 'SUSPECT';
      return this.flag;
    }
    if (this.flag === 'SUSPECT') {
      this.flag = 'UNKNOWN';
      return this.flag;
    }
    return 'UNKNOWN';
  }
}

export default Mine;
