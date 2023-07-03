import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSelectComponent } from './admin-select.component';

describe('AdminSelectComponent', () => {
  let component: AdminSelectComponent;
  let fixture: ComponentFixture<AdminSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminSelectComponent]
    });
    fixture = TestBed.createComponent(AdminSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
