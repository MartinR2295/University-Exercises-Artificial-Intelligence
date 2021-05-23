import {BaseRule} from "./base-rule.model";
import {Cell, CellStatus} from "./cell.model";

export class ObstacleAvoidanceRule extends BaseRule {

  static goForwardRules() {
    return [
      new ObstacleAvoidanceRule([], 90, ObstacleAvoidanceRuleState.Alive, 0)
    ]
  }

  constructor(public inputStates: ObstacleAvoidanceRuleState[], //9 inputs
              public inputDirection: number, //0,90,-90, 45, -45
              public outputState: ObstacleAvoidanceRuleState,
              public outputDirection: number) {
    super();
  }

  applyOn(cell: Cell, neighbours: Cell[]){
    if(cell.status == CellStatus.Alive) {
      console.log("neighbours of: ", cell, neighbours)
      neighbours = this.orderNeighboursToDirection(neighbours)
      console.log("ordered neighbours: of", cell, neighbours)
      cell.nextStatus = CellStatus.Dead
      console.log("formation", cell.robot.formation)

      // formation control if we have no obstacle in front
      /*if(neighbours[0].status == CellStatus.Dead) {
        // move to the fixedY
        let yDiff = cell.y - cell.robot.formation.keepY;
        if (yDiff != 0) {
          
        }

        // wait for the other ones.
      }*/

      for(let neighbour of neighbours) {
        if(neighbour.status == CellStatus.Dead) {
          neighbour.nextStatus = CellStatus.Alive
          cell.nextStatus = CellStatus.Dead
          neighbour.nextRobot = cell.robot
          break
        }
      }
    }
  }

  orderNeighboursToDirection(neighbours: Cell[]) {
    let orderedNeighbours: Cell[] = []

    switch (this.inputDirection) {
      case 0: {
        orderedNeighbours.push(neighbours[6])
        orderedNeighbours.push(neighbours[5])
        orderedNeighbours.push(neighbours[7])
        orderedNeighbours.push(neighbours[3])
        orderedNeighbours.push(neighbours[4])
        orderedNeighbours.push(neighbours[1])
        orderedNeighbours.push(neighbours[0])
        orderedNeighbours.push(neighbours[2])
        break
      }
      case 90: {
        orderedNeighbours.push(neighbours[4])
        orderedNeighbours.push(neighbours[7])
        orderedNeighbours.push(neighbours[2])
        orderedNeighbours.push(neighbours[6])
        orderedNeighbours.push(neighbours[1])
        orderedNeighbours.push(neighbours[3])
        orderedNeighbours.push(neighbours[5])
        orderedNeighbours.push(neighbours[0])
        break
      }
      default: {
        orderedNeighbours = neighbours
      }
    }


    return orderedNeighbours
  }
}

export enum ObstacleAvoidanceRuleState {
  Dead,
  Alive,
  Obstacle
}
