import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentviewComponent } from './incidentview.component';

describe('IncidentviewComponent', () => {
  let component: IncidentviewComponent;
  let fixture: ComponentFixture<IncidentviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncidentviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
