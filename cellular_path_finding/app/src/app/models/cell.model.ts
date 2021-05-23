import {Formation} from "./formation.model";
import {Robot} from "./robot.model";

export class Cell {

  nextStatus: CellStatus = null
  nextRobot: Robot = null
  robot: Robot = null

  constructor(public y: number,
              public x: number,
              public status: CellStatus = CellStatus.Dead) {

  }

  public toString = () : string => {
    return `Cell(${this.y}/${this.x} - ${this.status.valueOf()})`;
  }

  kill() {
    this.robot = null
    this.status = CellStatus.Dead
  }

  revive(newRobot: Robot = null) {
    if(newRobot != null) this.robot = newRobot
    this.status = CellStatus.Dead
  }

  angleToCell(other: Cell) {
    let result = Math.atan2(other.y - this.y, other.x - this.x)
    result *= 180 / Math.PI
    return result
  }
}

export enum CellStatus {
  Dead="Dead",
  Alive="Alive",
  Wall="Wall",
  Start="Start",
  End="End"
}
