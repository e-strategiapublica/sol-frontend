import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterSupplierUserComponent } from '../register-supplier-user/register-supplier-user.component';

describe('RegisterSupplierUserComponent', () => {
  let component: RegisterSupplierUserComponent;
  let fixture: ComponentFixture<RegisterSupplierUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterSupplierUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterSupplierUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
