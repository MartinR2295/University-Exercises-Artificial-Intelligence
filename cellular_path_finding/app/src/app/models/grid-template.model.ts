import {Grid} from "./grid.model";

export class GridTemplate {
  name: String = ""
  width: number = 10
  height: number = 10
  size: number = 50
  walls: {x: number, y: number}[] = []
  robots: {x: number, y: number}[] = []

  public static getAllTemplates() {
    return [
      GridTemplate.defaultTemplate(),
      GridTemplate.twiceLabTemplate(),
      GridTemplate.template1(),
      GridTemplate.template2(),
    ]
  }

  public static defaultTemplate() {
    let template = new GridTemplate()

    template.name = "Default"
    template.walls = []

    return template
  }

  public static twiceLabTemplate() {
    let template = new GridTemplate()
    template.name = "Dragon"
    template.size = 20
    template.height = 19
    template.width = 38
    template.walls = [{x: 0, y: 0},{x: 1, y: 0},{x: 2, y: 0},{x: 3, y: 0},{x: 4, y: 0},{x: 5, y: 0},{x: 6, y: 0},{x: 7, y: 0},{x: 8, y: 0},{x: 9, y: 0},{x: 10, y: 0},{x: 11, y: 0},{x: 11, y: 1},{x: 16, y: 1},{x: 17, y: 1},{x: 18, y: 1},{x: 19, y: 1},{x: 20, y: 1},{x: 11, y: 2},{x: 16, y: 2},{x: 20, y: 2},{x: 11, y: 3},{x: 16, y: 3},{x: 18, y: 3},{x: 20, y: 3},{x: 11, y: 4},{x: 15, y: 4},{x: 16, y: 4},{x: 18, y: 4},{x: 20, y: 4},{x: 11, y: 5},{x: 13, y: 5},{x: 14, y: 5},{x: 15, y: 5},{x: 18, y: 5},{x: 11, y: 6},{x: 13, y: 6},{x: 17, y: 6},{x: 18, y: 6},{x: 11, y: 7},{x: 13, y: 7},{x: 15, y: 7},{x: 16, y: 7},{x: 17, y: 7},{x: 11, y: 8},{x: 12, y: 8},{x: 13, y: 8},{x: 15, y: 8},{x: 15, y: 9},{x: 11, y: 10},{x: 12, y: 10},{x: 13, y: 10},{x: 15, y: 10},{x: 11, y: 11},{x: 13, y: 11},{x: 15, y: 11},{x: 11, y: 12},{x: 13, y: 12},{x: 15, y: 12},{x: 11, y: 13},{x: 13, y: 13},{x: 15, y: 13},{x: 16, y: 13},{x: 17, y: 13},{x: 19, y: 13},{x: 11, y: 14},{x: 13, y: 14},{x: 19, y: 14},{x: 11, y: 15},{x: 13, y: 15},{x: 14, y: 15},{x: 15, y: 15},{x: 16, y: 15},{x: 17, y: 15},{x: 18, y: 15},{x: 19, y: 15},{x: 11, y: 16},{x: 11, y: 17},{x: 0, y: 18},{x: 1, y: 18},{x: 2, y: 18},{x: 3, y: 18},{x: 4, y: 18},{x: 5, y: 18},{x: 6, y: 18},{x: 7, y: 18},{x: 8, y: 18},{x: 9, y: 18},{x: 10, y: 18},{x: 11, y: 18},]
    template.robots = [{x: 2, y: 2},{x: 4, y: 4},{x: 2, y: 6},]
    return template
  }

  public static template1() {
    let template = new GridTemplate()
    template.name = "Template 1"
    template.size = 10
    template.width = 68
    template.height = 36
    template.walls = [{x: 12, y: 0},{x: 13, y: 0},{x: 14, y: 0},{x: 15, y: 0},{x: 15, y: 1},{x: 15, y: 2},{x: 15, y: 3},{x: 15, y: 4},{x: 15, y: 5},{x: 15, y: 6},{x: 15, y: 7},{x: 16, y: 7},{x: 17, y: 7},{x: 15, y: 9},{x: 16, y: 9},{x: 17, y: 9},{x: 18, y: 9},{x: 19, y: 9},{x: 20, y: 9},{x: 21, y: 9},{x: 22, y: 9},{x: 23, y: 9},{x: 24, y: 9},{x: 25, y: 9},{x: 26, y: 9},{x: 27, y: 9},{x: 27, y: 10},{x: 15, y: 11},{x: 16, y: 11},{x: 17, y: 11},{x: 18, y: 11},{x: 19, y: 11},{x: 27, y: 11},{x: 19, y: 12},{x: 27, y: 12},{x: 15, y: 13},{x: 16, y: 13},{x: 17, y: 13},{x: 19, y: 13},{x: 27, y: 13},{x: 15, y: 14},{x: 17, y: 14},{x: 19, y: 14},{x: 27, y: 14},{x: 15, y: 15},{x: 17, y: 15},{x: 20, y: 15},{x: 27, y: 15},{x: 28, y: 15},{x: 29, y: 15},{x: 30, y: 15},{x: 15, y: 16},{x: 17, y: 16},{x: 18, y: 16},{x: 20, y: 16},{x: 15, y: 17},{x: 18, y: 17},{x: 20, y: 17},{x: 27, y: 17},{x: 28, y: 17},{x: 15, y: 18},{x: 18, y: 18},{x: 20, y: 18},{x: 27, y: 18},{x: 15, y: 19},{x: 18, y: 19},{x: 21, y: 19},{x: 22, y: 19},{x: 23, y: 19},{x: 24, y: 19},{x: 25, y: 19},{x: 27, y: 19},{x: 15, y: 20},{x: 19, y: 20},{x: 27, y: 20},{x: 16, y: 21},{x: 19, y: 21},{x: 20, y: 21},{x: 21, y: 21},{x: 22, y: 21},{x: 23, y: 21},{x: 24, y: 21},{x: 25, y: 21},{x: 26, y: 21},{x: 27, y: 21},{x: 17, y: 22},{x: 19, y: 22},{x: 18, y: 23},{x: 19, y: 23},{x: 23, y: 23},{x: 23, y: 24},{x: 18, y: 25},{x: 23, y: 25},{x: 18, y: 26},{x: 19, y: 26},{x: 20, y: 26},{x: 21, y: 26},{x: 22, y: 26},{x: 23, y: 26},{x: 23, y: 27},{x: 18, y: 28},{x: 18, y: 29},{x: 19, y: 29},{x: 20, y: 29},{x: 21, y: 29},{x: 22, y: 29},{x: 23, y: 29},{x: 23, y: 30},{x: 18, y: 31},{x: 19, y: 31},{x: 20, y: 31},{x: 21, y: 31},{x: 23, y: 31},{x: 18, y: 32},{x: 23, y: 32},{x: 20, y: 33},{x: 21, y: 33},{x: 23, y: 33},{x: 24, y: 33},{x: 18, y: 34},{x: 19, y: 34},{x: 20, y: 34},{x: 14, y: 35},{x: 15, y: 35},{x: 16, y: 35},{x: 17, y: 35},{x: 18, y: 35},]
    template.robots = [{x: 2, y: 9},{x: 3, y: 11},{x: 4, y: 13},{x: 5, y: 15},{x: 4, y: 17},{x: 3, y: 19},{x: 2, y: 21},]
    return template
  }

  public static template2() {
    let template = new GridTemplate()
    template.name = "Template 2"
    template.size = 30
    template.height = 9
    template.width = 30
    template.walls = [{x: 0, y: 0},{x: 1, y: 0},{x: 2, y: 0},{x: 3, y: 0},{x: 3, y: 1},{x: 3, y: 2},{x: 4, y: 2},{x: 4, y: 3},{x: 4, y: 5},{x: 3, y: 6},{x: 4, y: 6},{x: 3, y: 7},{x: 0, y: 8},{x: 1, y: 8},{x: 2, y: 8},{x: 3, y: 8},]
    template.robots = [{x: 0, y: 2},{x: 2, y: 4},{x: 0, y: 6},]
    return template
  }
}
