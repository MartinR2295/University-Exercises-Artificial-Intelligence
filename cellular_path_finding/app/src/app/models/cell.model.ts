export class Cell {

  constructor(public status: CellStatus = CellStatus.Dead) {
  }
}

export enum CellStatus {
  Dead,
  Alive,
  Wall,
  Start,
  End
}
