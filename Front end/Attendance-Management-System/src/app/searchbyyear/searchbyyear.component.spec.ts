import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchbyyearComponent } from './searchbyyear.component';

describe('SearchbyyearComponent', () => {
  let component: SearchbyyearComponent;
  let fixture: ComponentFixture<SearchbyyearComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchbyyearComponent]
    });
    fixture = TestBed.createComponent(SearchbyyearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
