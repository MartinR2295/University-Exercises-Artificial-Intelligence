import {Component, Input, OnInit} from '@angular/core';
import {Grid} from "../../models/grid.model";
import {BaseRule} from "../../models/base-rule.model";
import {interval, Observable, Subscription} from "rxjs";
import {CellStatus} from "../../models/cell.model";
import {GridTemplate} from "../../models/grid-template.model";

@Component({
  selector: 'app-cellular-system',
  templateUrl: './cellular-system.component.html',
  styleUrls: ['./cellular-system.component.scss']
})
export class CellularSystemComponent implements OnInit {

  grid: Grid;
  templates: GridTemplate[] = GridTemplate.getAllTemplates()

  @Input()
  title: string = "Title"

  @Input()
  subTitle: string = "SubTitle"

  @Input()
  rules: BaseRule[] = [];

  cellSize: number = 50
  autoStepTime: number = 0.5
  autoStepTimeInterval: Observable<number>;
  autoStepTimeIntervalSubscription: Subscription;
  cellCreationType: CellStatus = CellStatus.Alive;
  cellCreationTypes: CellStatus[] = [CellStatus.Alive, CellStatus.Wall, CellStatus.End]

  constructor() {
    this.grid = new Grid(10,10)
    this.templateSelected(this.templates[0])
  }

  ngOnInit(): void {
  }

  next() {
    this.grid.executeRules(this.rules)
    this.grid.switchMarkedCells()
  }

  tmpl() {
    let arrStr = "["
    for(let row of this.grid.raw_grid) {
      for (let cell of row) {
        if(cell.status == CellStatus.Wall) {
          arrStr += "{x: "+cell.x+", y: "+cell.y+"},"
        }
      }
    }
    arrStr += "]"
    console.log("walls: ", arrStr)

    arrStr = "["
    for(let row of this.grid.raw_grid) {
      for (let cell of row) {
        if(cell.robot != null) {
          arrStr += "{x: "+cell.x+", y: "+cell.y+"},"
        }
      }
    }
    arrStr += "]"

    console.log("robots: ", arrStr)
  }

  templateSelected(template) {
    console.log("choose template", template)
    this.cellSize = template.size
    this.gridHeightChange({value: template.height})
    this.gridWidthChange({value: template.width})
    this.grid.removeWalls()
    for(let coord of template.walls) {
      this.grid.raw_grid[coord.y][coord.x].status = CellStatus.Wall
    }
    this.grid.formation.robots = []
    for(let coord of template.robots) {
      let cell = this.grid.raw_grid[coord.y][coord.x]
      cell.status = CellStatus.Alive
      this.grid.formation.addRobotToCell(cell)
    }
  }

  reset() {
    this.grid.resetRobotsToOrigin()
  }

  sliderChange(event) {
    this.cellSize = event.value
  }

  autoStepTimeChange(event) {
    this.autoStepTime = event.value

    //if automation is already started, refresh it
    if(this.autoStepTimeInterval != null) {
      this.refreshAutoStep()
    }
  }

  gridHeightChange(event) {
    let newHeight = event.value
    let currentHeight = this.grid.raw_grid.length
    let difference = Math.abs(currentHeight-newHeight)

    for(let i = 0; i < difference; i++) {
      if(newHeight > currentHeight) {
        this.grid.addRow(this.grid.raw_grid[0].length)
        continue
      }
      this.grid.removeLastRow()
    }
  }

  gridWidthChange(event) {
    this.grid.changeWidth(event.value)
  }

  changeAutoStepState() {
    if(this.autoStepTimeInterval != null) {
      this.autoStepTimeInterval = null;
      this.autoStepTimeIntervalSubscription.unsubscribe()
      return
    }

    this.refreshAutoStep()
  }

  refreshAutoStep() {
    if(this.autoStepTimeIntervalSubscription != null) {
      this.autoStepTimeIntervalSubscription.unsubscribe()
    }

    this.autoStepTimeInterval = interval(1000*this.autoStepTime)
    let thisContext = this;
    this.autoStepTimeIntervalSubscription = this.autoStepTimeInterval.subscribe(function (n) {
      thisContext.next()
    })
  }

}
