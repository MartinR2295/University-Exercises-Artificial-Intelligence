import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellularSystemComponent } from './cellular-system.component';

describe('CellularSystemComponent', () => {
  let component: CellularSystemComponent;
  let fixture: ComponentFixture<CellularSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CellularSystemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CellularSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
