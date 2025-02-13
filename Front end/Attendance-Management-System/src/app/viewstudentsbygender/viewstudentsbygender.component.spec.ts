import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewstudentsbygenderComponent } from './viewstudentsbygender.component';

describe('ViewstudentsbygenderComponent', () => {
  let component: ViewstudentsbygenderComponent;
  let fixture: ComponentFixture<ViewstudentsbygenderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewstudentsbygenderComponent]
    });
    fixture = TestBed.createComponent(ViewstudentsbygenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
