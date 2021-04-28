import {Cell} from "./cell.model";

export class Grid {
  raw_grid:Cell[][];

  constructor(height: number, width: number) {
    this.raw_grid = []
    for(let y = 0; y < height; y++) {
      let row:Cell[] = []
      for(let x = 0; x < width; x++) {
        let cell = new Cell()
        row.push(cell)
      }
      this.raw_grid.push(row)
    }
  }

}
