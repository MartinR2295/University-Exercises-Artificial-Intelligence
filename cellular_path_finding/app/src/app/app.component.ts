import {Component} from '@angular/core';
import {Grid} from "./models/grid.model";
import {BaseRule} from "./models/base-rule.model";
import {GolRule, GolRuleState} from "./models/gol-rule.model";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'cellular-path-finding';
  grid: Grid;
  rules: BaseRule[] = [];

  constructor() {
    this.grid = new Grid(50,50)

    //set the rules
    this.rules.push(new GolRule(GolRuleState.Alive, GolRuleState.Dead, 0, 1))
    this.rules.push(new GolRule(GolRuleState.Alive, GolRuleState.Dead, 4, null))
    this.rules.push(new GolRule(GolRuleState.Dead, GolRuleState.Alive, 3, 3))
  }

  next() {
    this.grid.executeRules(this.rules)
    this.grid.switchMarkedCells()
  }
}
