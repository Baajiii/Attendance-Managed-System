import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondyearPgComponent } from './secondyear-pg.component';

describe('SecondyearPgComponent', () => {
  let component: SecondyearPgComponent;
  let fixture: ComponentFixture<SecondyearPgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SecondyearPgComponent]
    });
    fixture = TestBed.createComponent(SecondyearPgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
