import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewattendancebydateComponent } from './viewattendancebydate.component';

describe('ViewattendancebydateComponent', () => {
  let component: ViewattendancebydateComponent;
  let fixture: ComponentFixture<ViewattendancebydateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewattendancebydateComponent]
    });
    fixture = TestBed.createComponent(ViewattendancebydateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
