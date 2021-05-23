import {Cell, CellStatus} from "./cell.model";
import {BaseRule} from "./base-rule.model";
import {Formation} from "./formation.model";

export class Grid {
  raw_grid:Cell[][];
  formation: Formation;

  constructor(height: number, width: number) {
    this.raw_grid = []
    for(let y = 0; y < height; y++) {
      this.addRow(width)
    }
    this.formation = new Formation()
  }

  resetRobotsToOrigin() {
    for(let robot of this.formation.robots) {
      robot.direction = 0
      robot.lastDirection = 0
      robot.nextDirection = null
      robot.cell.status = CellStatus.Dead
      robot.cell.robot = null
      if(robot.isMasterInFormation()) {
        this.formation.originCell.nextRobot = robot
        this.formation.originCell.nextStatus = CellStatus.Alive
        continue
      }

      let originCell = this.raw_grid[this.formation.originCell.y+robot.formY][this.formation.originCell.x+robot.formX]
      originCell.nextRobot = robot
      originCell.nextStatus = CellStatus.Alive
    }

    this.switchMarkedCells()
  }

  removeWalls() {
    this.raw_grid.forEach(function(row) {
      row.forEach(function (cell) {
        if(cell.status == CellStatus.Wall) {
          cell.status = CellStatus.Dead
        }
      });
    });
  }

  removeRobots() {
    this.formation.robots = []
    this.formation.originCell = null
    this.raw_grid.forEach(function(row) {
      row.forEach(function (cell) {
        if(cell.status == CellStatus.Alive) {
          cell.status = CellStatus.Dead
          cell.robot = null
          cell.nextRobot = null
          cell.nextStatus = null
        }
      });
    });
  }

  addRow(width: number) {
    let y = this.raw_grid.length
    let row:Cell[] = []
    for(let x = 0; x < width; x++) {
      let cell = new Cell(y, x)
      row.push(cell)
    }
    this.raw_grid.push(row)
  }

  changeWidth(newWidth: number) {
    let difference = this.raw_grid[0].length-newWidth
    this.raw_grid.forEach(function(row) {
      if(difference > 0) {
        row.splice(-difference)
      } else {
        for(let i = 0; i < Math.abs(difference); i++) {
          let lastCell = row[row.length-1]
          row.push(new Cell(lastCell.y, lastCell.x+1))
        }
      }
    });
  }

  removeLastRow() {
    this.raw_grid.pop()
  }

  //revive a cell in the grid
  revive(y, x) {
    this.raw_grid[y][x].revive()
  }

  //kill a cell in the grid
  kill(y, x) {
    this.raw_grid[y][x].kill()
  }

  // execute rules on all cells, and mark the cells
  // no cells will change with this method.
  // for the changement you have to call switch_marked_cells after it
  executeRules(rules: BaseRule[]) {
    let thisContext = this
    this.raw_grid.forEach(function(row) {
      row.forEach(function (cell) {
        rules.forEach(function (rule) {
          rule.applyOn(cell, thisContext.getNeighbours(cell))
        });
      });
    });
  }

  //switch all marked cells and unmark it
  switchMarkedCells() {
    this.raw_grid.forEach(function(row) {
      row.forEach(function (cell) {
        if(cell.robot != null) {
          cell.robot.lastDirection = cell.robot.direction
        }
        if(cell.robot != null && cell.robot.nextDirection != null) {
          cell.robot.direction = cell.robot.nextDirection
          cell.robot.nextDirection = null
          return
        }
        if(cell.nextStatus != null) {
          cell.status = cell.nextStatus
          cell.nextStatus = null
        }
        if(cell.status == CellStatus.Alive && cell.nextRobot != null) {
          cell.robot = cell.nextRobot
          cell.robot.cell = cell
          cell.nextRobot = null
        } else {
          cell.robot = null
          cell.nextRobot = null
        }
        if(cell.robot != null) {
          console.log("robot and cell after", cell, cell.robot)
        }
      });
    });
  }

  getNeighbours(cell: Cell) {
    let neighbours: Cell[] = []
    for(let offsetY = -1; offsetY <= 1; offsetY++) {
      for(let offsetX = -1; offsetX <= 1; offsetX++) {
        //skip at the current cell
        if(offsetX == 0 && offsetY == 0) {
          continue
        }

        let neighbourX = cell.x + offsetX
        let neighbourY = cell.y + offsetY

        //handle boundaries
        let height = this.raw_grid.length
        let width = this.raw_grid[0].length

        //top and bottom
        if(neighbourY < 0) neighbourY = height + neighbourY
        else if(neighbourY >= height) neighbourY = neighbourY - height
        //left and right
        if(neighbourX < 0) neighbourX = width + neighbourX
        else if(neighbourX >= width) neighbourX = neighbourX - width

        neighbours.push(this.raw_grid[neighbourY][neighbourX])
      }
    }

    return neighbours
  }
}
