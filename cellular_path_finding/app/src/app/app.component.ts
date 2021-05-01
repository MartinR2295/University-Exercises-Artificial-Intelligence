import {Component} from '@angular/core';
import {Grid} from "./models/grid.model";
import {BaseRule} from "./models/base-rule.model";
import {GolRule, GolRuleState} from "./models/gol-rule.model";
import {interval, Observable, Subscription} from "rxjs";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'cellular-path-finding';
  grid: Grid;
  rules: BaseRule[] = [];
  cellSize: number = 50
  autoStepTime: number = 0.5
  autoStepTimeInterval: Observable<number>;
  autoStepTimeIntervalSubscription: Subscription;

  constructor() {
    this.grid = new Grid(10,10)
    //set the rules
    this.rules.push(new GolRule(GolRuleState.Alive, GolRuleState.Dead, 0, 1))
    this.rules.push(new GolRule(GolRuleState.Alive, GolRuleState.Dead, 4, null))
    this.rules.push(new GolRule(GolRuleState.Dead, GolRuleState.Alive, 3, 3))
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
    this.refreshAutoStep()
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
