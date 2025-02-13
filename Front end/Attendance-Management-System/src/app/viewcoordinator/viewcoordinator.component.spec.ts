import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewcoordinatorComponent } from './viewcoordinator.component';

describe('ViewcoordinatorComponent', () => {
  let component: ViewcoordinatorComponent;
  let fixture: ComponentFixture<ViewcoordinatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewcoordinatorComponent]
    });
    fixture = TestBed.createComponent(ViewcoordinatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
