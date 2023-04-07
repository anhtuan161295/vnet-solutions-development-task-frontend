import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleResultsComponent } from './sale-results.component';

describe('SaleResultsComponent', () => {
  let component: SaleResultsComponent;
  let fixture: ComponentFixture<SaleResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaleResultsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaleResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
