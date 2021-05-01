import {BaseRule} from "./base-rule.model";
import {Cell} from "./cell.model";

export class ObstacleAvoidanceRule extends BaseRule {
  constructor(public inputStates: ObstacleAvoidanceRuleState[], //9 inputs
              public inputDirection: number, //0,90,-90, 45, -45
              public outputState: ObstacleAvoidanceRuleState,
              public outputDirection: number) {
    super();
  }

  applyOn(cell: Cell, neighbours: Cell[]){
    super.applyOn(cell, neighbours);
  }
}

export enum ObstacleAvoidanceRuleState {
  Dead,
  Alive,
  Obstacle
}
