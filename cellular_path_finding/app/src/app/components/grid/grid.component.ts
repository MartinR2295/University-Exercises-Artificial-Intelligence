import {Component, Input, OnInit} from '@angular/core';
import {Grid} from "../../models/grid.model";
import {Cell, CellStatus} from "../../models/cell.model";

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

  @Input()
  grid: Grid;

  @Input()
  maxHeight: number = 1000

  @Input()
  cellWidth: number = 50

  @Input()
  cellHeight: number = 50

  @Input()
  cellCreationType: CellStatus = CellStatus.Alive

  constructor() { }

  ngOnInit(): void {
  }

  click_on_cell(cell: Cell) {
    if(cell.robot != null) { // remove the robot from formation
      this.grid.formation.deleteRobot(cell.robot);
      cell.robot = null;
    }
    cell.status = cell.status == CellStatus.Dead ? this.cellCreationType : CellStatus.Dead;

    if(cell.status == CellStatus.Alive) { // add robot to the formation
      this.grid.formation.addRobotToCell(cell)
      console.log("add robot: ", cell.robot)
    }
  }

}
