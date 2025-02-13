import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddclassComponent } from './addclass.component';

describe('AddclassComponent', () => {
  let component: AddclassComponent;
  let fixture: ComponentFixture<AddclassComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddclassComponent]
    });
    fixture = TestBed.createComponent(AddclassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
