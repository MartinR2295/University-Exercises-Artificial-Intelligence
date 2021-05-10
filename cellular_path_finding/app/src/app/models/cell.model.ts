export class Cell {

  nextStatus: CellStatus = null
  nextIndex: number = null

  constructor(public y: number, public x: number, public status: CellStatus = CellStatus.Dead,
              public index: number = -1) {

  }

  public toString = () : string => {
    return `Cell(${this.y}/${this.x} - ${this.status.valueOf()})`;
  }

  kill() {
    this.index = -1
    this.status = CellStatus.Dead
  }

  revive(newIndex: number = null) {
    if(newIndex != null) this.index = newIndex
    this.status = CellStatus.Dead
  }
}

export enum CellStatus {
  Dead="Dead",
  Alive="Alive",
  Wall="Wall",
  Start="Start",
  End="End"
}
