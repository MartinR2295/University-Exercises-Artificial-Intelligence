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

  constructor() { }

  ngOnInit(): void {
  }

  click_on_cell(cell: Cell) {
    console.log("click")
    cell.status = cell.status == CellStatus.Alive ? CellStatus.Dead : CellStatus.Alive;
  }
}
