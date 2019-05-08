import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefensiveEffectivenessRemarksComponent } from './defensive-effectiveness-remarks.component';

describe('DefensiveEffectivenessRemarksComponent', () => {
  let component: DefensiveEffectivenessRemarksComponent;
  let fixture: ComponentFixture<DefensiveEffectivenessRemarksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefensiveEffectivenessRemarksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefensiveEffectivenessRemarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
