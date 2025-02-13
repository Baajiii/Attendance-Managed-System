import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstyearUgComponent } from './firstyear-ug.component';

describe('FirstyearUgComponent', () => {
  let component: FirstyearUgComponent;
  let fixture: ComponentFixture<FirstyearUgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FirstyearUgComponent]
    });
    fixture = TestBed.createComponent(FirstyearUgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
