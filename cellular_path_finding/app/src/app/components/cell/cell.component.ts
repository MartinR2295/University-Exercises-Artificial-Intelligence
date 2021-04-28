import {Component, Input, OnInit} from '@angular/core';
import {Cell, CellStatus} from "../../models/cell.model";

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent implements OnInit {

  constructor() { }

  @Input()
  cell: Cell

  @Input()
  is_right_edge_cell: boolean = false

  @Input()
  is_bottom_edge_cell: boolean = false

  @Input()
  is_left_edge_cell: boolean = false

  @Input()
  cell_status_css_class_mapper: Map<CellStatus, string> = new Map<CellStatus, string>([
    [CellStatus.Dead, "white"],
    [CellStatus.Alive, "black"],
    [CellStatus.Wall, "red"],
    [CellStatus.Start, "green"],
    [CellStatus.End, "blue"]
  ])

  ngOnInit(): void {
  }

  get_status_class() {
    if(this.cell_status_css_class_mapper.has(this.cell.status)) {
      return this.cell_status_css_class_mapper.get(this.cell.status)
    }

    return "white";
  }
}
