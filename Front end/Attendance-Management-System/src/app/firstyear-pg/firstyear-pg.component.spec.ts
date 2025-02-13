import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstyearPgComponent } from './firstyear-pg.component';

describe('FirstyearPgComponent', () => {
  let component: FirstyearPgComponent;
  let fixture: ComponentFixture<FirstyearPgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FirstyearPgComponent]
    });
    fixture = TestBed.createComponent(FirstyearPgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
