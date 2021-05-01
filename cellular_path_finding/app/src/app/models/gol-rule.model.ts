import {BaseRule} from "./base-rule.model";
import {Cell, CellStatus} from "./cell.model";

export class GolRule extends BaseRule {
  constructor(public startState: GolRuleState,
              public endState: GolRuleState,
              public minAliveNeighbours: number,
              public maxAliveNeighbours: number) {
    super();
  }

  applyOn(cell: Cell, neighbours: Cell[]): [any, number] {
    //check if we have the needed startState
    if(!(cell.status == CellStatus.Alive && this.startState == GolRuleState.Alive)
      && !(cell.status == CellStatus.Dead && this.startState == GolRuleState.Dead)) {
      return null;
    }

    //calculate alive neighbours
    let aliveNeighbours = 0
    neighbours.forEach(function (neighbour) {
      if(neighbour.status == CellStatus.Alive) {
        aliveNeighbours += 1
      }
    });

    //check the rules
    if(aliveNeighbours < this.minAliveNeighbours) {
      return
    }
    if(this.maxAliveNeighbours != null && aliveNeighbours > this.maxAliveNeighbours) {
      return
    }

    //mark the cell if it needs a changement
    if(this.endState == GolRuleState.Alive && cell.status == CellStatus.Dead) {
      cell.nextStatus = CellStatus.Alive
    } else if(this.endState == GolRuleState.Dead && cell.status == CellStatus.Alive) {
      cell.nextStatus = CellStatus.Dead
    }
  }
}

export enum GolRuleState {
  Dead,
  Alive
}
/*
class Rule(object):

    def __init__(self, start_state, end_state, min_alive_neighbours, max_alive_neighbours=None):
        self.start_state = start_state
        self.end_state = end_state
        self.min_alive_neighbours = min_alive_neighbours
        self.max_alive_neighbours = max_alive_neighbours

    # execute this rule on a specific cell with their neighbours
    # this method will set the mark flag in the cell if needed
    def execute_rule_on(self, cell: Cell, neighbours: [Cell]):
        # check if we have the needed start_state
        if cell.alive != self.start_state:
            return

        # calculate alive neighbours
        alive_neighbours = 0
        for neighbour in neighbours:
            if neighbour.alive:
                alive_neighbours += 1

        # check the rules
        if alive_neighbours < self.min_alive_neighbours:
            return
        if self.max_alive_neighbours and alive_neighbours > self.max_alive_neighbours:
            return

        # mark the cell if it needed a changement
        if cell.alive != self.end_state:
            cell.mark()
 */
