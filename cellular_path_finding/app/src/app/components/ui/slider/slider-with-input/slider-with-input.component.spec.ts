import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderWithInputComponent } from './slider-with-input.component';

describe('SliderWithInputComponent', () => {
  let component: SliderWithInputComponent;
  let fixture: ComponentFixture<SliderWithInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SliderWithInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderWithInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
