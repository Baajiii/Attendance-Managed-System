import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondyearUgComponent } from './secondyear-ug.component';

describe('SecondyearUgComponent', () => {
  let component: SecondyearUgComponent;
  let fixture: ComponentFixture<SecondyearUgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SecondyearUgComponent]
    });
    fixture = TestBed.createComponent(SecondyearUgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
