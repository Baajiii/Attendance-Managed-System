import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditattendanceforstaffComponent } from './editattendanceforstaff.component';

describe('EditattendanceforstaffComponent', () => {
  let component: EditattendanceforstaffComponent;
  let fixture: ComponentFixture<EditattendanceforstaffComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditattendanceforstaffComponent]
    });
    fixture = TestBed.createComponent(EditattendanceforstaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
