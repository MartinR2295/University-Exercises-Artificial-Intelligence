import {Cell} from "./cell.model";
import {Formation} from "./formation.model";

export class Robot {

  direction = 0
  nextDirection = null

  public constructor(public formY: number,
                     public formX: number,
                     public cell: Cell,
                     public formation: Formation) {
  }
}
