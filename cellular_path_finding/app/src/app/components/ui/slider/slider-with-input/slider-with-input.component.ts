import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-slider-with-input',
  templateUrl: './slider-with-input.component.html',
  styleUrls: ['./slider-with-input.component.scss']
})
export class SliderWithInputComponent {

  @Input()
  name: string = ""

  @Input()
  value: number = 0

  @Input()
  min: number = 0

  @Input()
  max: number = 0

  @Input()
  step: number = 1

  @Output()
  valueChanged = new EventEmitter<number>()

  inputEvent(event) {
    this.valueChanged.emit(event)
  }

  inputFromInpField(event) {
    this.valueChanged.emit(event.target)
  }
}
