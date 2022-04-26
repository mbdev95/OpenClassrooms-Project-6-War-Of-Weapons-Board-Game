// ----- Board Class 
class Board {
    constructor() {
      this.columns = 10;
      this.rows = 10;
      this.spaces = this.spaces();
    }
// Board - spaces() - A function to store all the spaces by identifying each space with a column and row number.
    spaces() {
      let spaces = [];
      for (let x = 1; x <= this.columns; x++) {
        let columns = [];
        for (let y = 1; y <= this.rows; y++) {
          const space = new Space($(`#${x}-${y}`), $(`#${x}-${y}`).attr("data-column"), $(`#${x}-${y}`).attr("data-row"));
          columns.push(space);
        }
        spaces.push(columns);
      }
      return spaces;
    }
  }
