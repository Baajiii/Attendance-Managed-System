import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditclassComponent } from './editclass.component';

describe('EditclassComponent', () => {
  let component: EditclassComponent;
  let fixture: ComponentFixture<EditclassComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditclassComponent]
    });
    fixture = TestBed.createComponent(EditclassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
