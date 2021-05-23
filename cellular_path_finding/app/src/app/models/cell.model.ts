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
}

export enum CellStatus {
  Dead="Dead",
  Alive="Alive",
  Wall="Wall",
  Start="Start",
  End="End"
}
