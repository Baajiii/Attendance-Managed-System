import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcoordinatorComponent } from './addcoordinator.component';

describe('AddcoordinatorComponent', () => {
  let component: AddcoordinatorComponent;
  let fixture: ComponentFixture<AddcoordinatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddcoordinatorComponent]
    });
    fixture = TestBed.createComponent(AddcoordinatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
