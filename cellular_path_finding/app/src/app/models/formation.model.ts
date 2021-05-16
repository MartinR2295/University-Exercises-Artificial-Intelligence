import {Cell} from "./cell.model";

export class Formation {
  public constructor() {
  }
}

export class FormationMember {
  public constructor(public y: number,
                     public x: number,
                     public cell: Cell) {
  }
}
