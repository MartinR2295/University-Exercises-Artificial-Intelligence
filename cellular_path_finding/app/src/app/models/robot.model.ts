import {Cell} from "./cell.model";
import {Formation} from "./formation.model";

export class Robot {

  //direction in relation to formation (0 degree means the direction of the formation)
  direction = 0
  nextDirection = null
  lastDirection = 0

  public constructor(public formY: number,
                     public formX: number,
                     public cell: Cell,
                     public formation: Formation) {
  }
}
