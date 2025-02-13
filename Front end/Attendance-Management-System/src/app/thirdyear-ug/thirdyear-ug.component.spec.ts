import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdyearUgComponent } from './thirdyear-ug.component';

describe('ThirdyearUgComponent', () => {
  let component: ThirdyearUgComponent;
  let fixture: ComponentFixture<ThirdyearUgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThirdyearUgComponent]
    });
    fixture = TestBed.createComponent(ThirdyearUgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
