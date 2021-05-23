import {Robot} from "./robot.model";
import {Cell} from "./cell.model";

export class Formation {

  // cell of the origin master robot (need to implement a reset function)
  originCell:Cell = null

  public constructor(public keepY: number = null,
                     public keepX: number = null,
                     public robots: Robot[] = []) {
  }

  public addRobotToCell(cell: Cell) {
    // add the first robot
    if(this.robots.length == 0) {
      this.originCell = cell
      let robot = new Robot(0, 0, cell, this)
      this.keepY = cell.y
      this.robots.push(robot)
      cell.robot = robot
    } else { // add another robot
      let mainRobot = this.robots[0]
      let y = cell.y - mainRobot.cell.y
      let x = cell.x - mainRobot.cell.x
      let robot = new Robot(y, x, cell, this)
      this.robots.push(robot)
      cell.robot = robot
    }
  }

  public deleteRobot(robot: Robot) {
    let newRobots = []

    this.robots.forEach(cRobot => {
      if(robot != cRobot) {
        newRobots.push(cRobot)
      }
      //TODO reorder all robots fromY and formX if the root robot was deleted
    })

    this.robots = newRobots
  }
}
