import {Component, Input, OnInit} from '@angular/core';
import {Grid} from "../../models/grid.model";
import {BaseRule} from "../../models/base-rule.model";
import {interval, Observable, Subscription} from "rxjs";
import {CellStatus} from "../../models/cell.model";
import {GolRule, GolRuleState} from "../../models/gol-rule.model";

@Component({
  selector: 'app-cellular-system',
  templateUrl: './cellular-system.component.html',
  styleUrls: ['./cellular-system.component.scss']
})
export class CellularSystemComponent implements OnInit {

  grid: Grid;

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
    //set the rules
    this.rules.push(new GolRule(GolRuleState.Alive, GolRuleState.Dead, 0, 1))
    this.rules.push(new GolRule(GolRuleState.Alive, GolRuleState.Dead, 4, null))
    this.rules.push(new GolRule(GolRuleState.Dead, GolRuleState.Alive, 3, 3))
  }

  ngOnInit(): void {
  }

  next() {
    this.grid.executeRules(this.rules)
    this.grid.switchMarkedCells()
  }

  sliderChange(event) {
    this.cellSize = event.value
  }

  autoStepTimeChange(event) {
    console.log(event.value)
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
