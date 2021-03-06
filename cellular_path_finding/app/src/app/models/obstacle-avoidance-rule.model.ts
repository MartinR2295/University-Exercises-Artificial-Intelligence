import {BaseRule} from "./base-rule.model";
import {Cell, CellStatus} from "./cell.model";

export class ObstacleAvoidanceRule extends BaseRule {

  static goForwardRules() {
    return [
      new ObstacleAvoidanceRule([], 0, ObstacleAvoidanceRuleState.Alive, 0)
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
      // get the robot
      let robot = cell.robot

      //get ordered neighbours in relation to zero angle of formation
      this.inputDirection = 0
      let formationOrderedNeighbours = this.orderNeighboursToDirection(neighbours)
      // get orderedNeighbours in formation direction
      this.inputDirection = robot.direction
      let orderedNeighbours = this.orderNeighboursToDirection(neighbours)

      // move the robot to formation direction if possible
      if(robot.direction != 0
        && formationOrderedNeighbours[0].status == CellStatus.Dead) {
        robot.nextDirection = 0;
        return
      }

      // move the robot or change direction
      for(let i = 0; i < orderedNeighbours.length; i++) {
        let neighbour = orderedNeighbours[i];

        //move robot if first neighbour is free
        if(i == 0 && neighbour.status == CellStatus.Dead) {
          // direction control if we have no obstacle in formation direction
          if(robot.direction == 0 && robot.lastDirection == 0) {
            // do formation control stuff
            let otherRobots = robot.getOtherRobots()
            if(robot.isMasterInFormation()) {
              // do stuff if we are the master

              // first check y
              if(robot.currentYInFormation() != 0) {
                if(robot.currentYInFormation() > 0 && orderedNeighbours[2].status == CellStatus.Dead && orderedNeighbours[2].nextStatus != CellStatus.Alive) {
                  this.moveToNeighbour(cell, orderedNeighbours[2])
                  return
                } else if(robot.currentYInFormation() < 0 && orderedNeighbours[1].status == CellStatus.Dead && orderedNeighbours[1].nextStatus != CellStatus.Alive) {
                  this.moveToNeighbour(cell, orderedNeighbours[1])
                  return
                }
              } else {
                // ask the slaves if they have the right x position

                // if any slave is in front, move master and return
                for(let rbt of otherRobots) {
                  if(rbt.currentXInFormationOffset() > 0) {
                    this.moveToNeighbour(cell, neighbour)
                    return
                  }
                }

                // if one slave is back, do nothing with master and return
                for(let rbt of otherRobots) {
                  if(rbt.currentXInFormationOffset() < 0) {
                    cell.nextRobot = cell.robot
                    return
                  }
                }

                // if every slave is in the right x position move in front
                this.moveToNeighbour(cell, neighbour)
                return
              }
            } else {
              // do stuff if we are the slave
              // first check y
              if(robot.currentYInFormationOffset() != 0) {
                if(robot.currentYInFormationOffset() > 0 && orderedNeighbours[2].status == CellStatus.Dead && orderedNeighbours[2].nextStatus != CellStatus.Alive) {
                  this.moveToNeighbour(cell, orderedNeighbours[2])
                  return
                } else if(robot.currentYInFormationOffset() < 0 && orderedNeighbours[1].status == CellStatus.Dead && orderedNeighbours[1].nextStatus != CellStatus.Alive) {
                  this.moveToNeighbour(cell, orderedNeighbours[1])
                  return
                }
              } else {
                //do x stuff
                if(robot.currentXInFormationOffset() > 0) {
                  cell.nextRobot = cell.robot
                  return
                }
              }
            }
          }
          if(neighbour.nextStatus != CellStatus.Alive) {
            this.moveToNeighbour(cell, neighbour)
          }
          cell.nextRobot = cell.robot
          return
        }

        //turn robot if we need a new direction
        if(neighbour.status == CellStatus.Dead) {
          robot.nextDirection = cell.angleToCell(neighbour)
          return
        }
      }
    }
  }

  moveToNeighbour(cell, neighbour) {
    if(Math.abs(cell.x - neighbour.x) > 1 || Math.abs(cell.y - neighbour.y)) {
      // reset
    }
    cell.moveToNeighbour(neighbour)
  }

  orderNeighboursToDirection(neighbours: Cell[]) {
    let orderedNeighbours: Cell[] = []

    switch (this.inputDirection) {
      case 0: {
        orderedNeighbours.push(neighbours[4])
        orderedNeighbours.push(neighbours[6])
        orderedNeighbours.push(neighbours[1])
        orderedNeighbours.push(neighbours[3])
        break
      }
      case 90: {
        orderedNeighbours.push(neighbours[6])
        orderedNeighbours.push(neighbours[3])
        orderedNeighbours.push(neighbours[4])
        orderedNeighbours.push(neighbours[1])
        break
      }
      case -90: {
        orderedNeighbours.push(neighbours[1])
        orderedNeighbours.push(neighbours[4])
        orderedNeighbours.push(neighbours[3])
        orderedNeighbours.push(neighbours[6])
        break
      }
      case 180: {
        orderedNeighbours.push(neighbours[3])
        orderedNeighbours.push(neighbours[6])
        orderedNeighbours.push(neighbours[4])
        orderedNeighbours.push(neighbours[1])
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
