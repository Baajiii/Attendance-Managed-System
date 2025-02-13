import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewattendancestudentComponent } from './viewattendancestudent.component';

describe('ViewattendancestudentComponent', () => {
  let component: ViewattendancestudentComponent;
  let fixture: ComponentFixture<ViewattendancestudentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewattendancestudentComponent]
    });
    fixture = TestBed.createComponent(ViewattendancestudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
