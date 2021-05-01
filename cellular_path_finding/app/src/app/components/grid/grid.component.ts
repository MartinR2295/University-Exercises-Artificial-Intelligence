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

  constructor() { }

  ngOnInit(): void {
  }

  click_on_cell(cell: Cell) {
    console.log("click on cell: "+cell)
    console.log("neighbours:")
    /*this.grid.getNeighbours(cell).forEach(function (neighbour) {
      neighbour.status = CellStatus.Wall
      console.log("n: "+neighbour)
    })*/
    cell.status = cell.status == CellStatus.Alive ? CellStatus.Dead : CellStatus.Alive;
  }
}
