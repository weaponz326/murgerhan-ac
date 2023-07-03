import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGeneralSummaryComponent } from './admin-general-summary.component';

describe('AdminGeneralSummaryComponent', () => {
  let component: AdminGeneralSummaryComponent;
  let fixture: ComponentFixture<AdminGeneralSummaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminGeneralSummaryComponent]
    });
    fixture = TestBed.createComponent(AdminGeneralSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
