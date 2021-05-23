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

  public isMasterInFormation() {
    return this.formation.robots[0] == this;
  }

  public currentXInFormation() {
    return this.cell.x - this.formation.robots[0].currentXInFormation()
  }

  public currentYInFormation() {
    return this.cell.y - this.formation.keepY
  }
}
