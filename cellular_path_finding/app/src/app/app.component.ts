import {Component} from '@angular/core';
import {Grid} from "./models/grid.model";
import {BaseRule} from "./models/base-rule.model";
import {GolRule, GolRuleState} from "./models/gol-rule.model";
import {interval, Observable, Subscription} from "rxjs";
import {CellStatus} from "./models/cell.model";
import {ObstacleAvoidanceRule} from "./models/obstacle-avoidance-rule.model";
import {GridTemplate} from "./models/grid-template.model";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'cellular-path-finding';
  templates = GridTemplate.getAllTemplates()
  gameOfLifeRules = GolRule.gameOfLifeRules()
  pathFindingRules = ObstacleAvoidanceRule.goForwardRules()

  constructor() {
  }
}
