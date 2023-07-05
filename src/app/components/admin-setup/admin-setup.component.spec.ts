import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSetupComponent } from './admin-setup.component';

describe('AdminSetupComponent', () => {
  let component: AdminSetupComponent;
  let fixture: ComponentFixture<AdminSetupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminSetupComponent]
    });
    fixture = TestBed.createComponent(AdminSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
