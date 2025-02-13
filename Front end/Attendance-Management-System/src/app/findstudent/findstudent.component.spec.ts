import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindstudentComponent } from './findstudent.component';

describe('FindstudentComponent', () => {
  let component: FindstudentComponent;
  let fixture: ComponentFixture<FindstudentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FindstudentComponent]
    });
    fixture = TestBed.createComponent(FindstudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
