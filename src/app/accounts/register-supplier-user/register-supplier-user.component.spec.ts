import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { RegisterSupplierUserComponent } from './register-supplier-user.component';
import { UserService } from 'src/services/user.service';
import { SupplierService } from 'src/services/supplier.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';

class UserServiceMock {
  registerWithoutAuth() { return of({}); }
}
class SupplierServiceMock {
  supplierListWithoutAuth() { return of([]); }
}
class NgxSpinnerServiceMock {
  show() {}
  hide() {}
}
class ToastrServiceMock {
  success() {}
  error() {}
}

describe('RegisterSupplierUserComponent', () => {
  let component: RegisterSupplierUserComponent;
  let fixture: ComponentFixture<RegisterSupplierUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterSupplierUserComponent ],
      providers: [
        { provide: UserService, useClass: UserServiceMock },
        { provide: SupplierService, useClass: SupplierServiceMock },
        { provide: NgxSpinnerService, useClass: NgxSpinnerServiceMock },
        { provide: ToastrService, useClass: ToastrServiceMock },
      ],
      imports: [HttpClientTestingModule, TranslateModule.forRoot()],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
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
