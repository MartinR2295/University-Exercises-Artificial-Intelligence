import {Component, ElementRef, ViewChild} from '@angular/core';
import {Grid} from "./models/grid.model";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'cellular-path-finding';
  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;
  grid: Grid;

  private ctx: CanvasRenderingContext2D;

  constructor() {
    this.grid = new Grid(10,10)
  }

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
  }

  animate(): void {
    for(var y = 0; y < 10; y++) {
      for(var x = 0; x < 10; x++) {
        this.ctx.fillRect(x*10, y*10, 10, 10);
      }
    }
  }
}
