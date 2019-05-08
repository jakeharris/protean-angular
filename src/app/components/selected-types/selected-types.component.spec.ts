import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedTypesComponent } from './selected-types.component';

describe('SelectedTypesComponent', () => {
  let component: SelectedTypesComponent;
  let fixture: ComponentFixture<SelectedTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
