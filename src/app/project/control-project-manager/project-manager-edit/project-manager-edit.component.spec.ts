import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { SupplierService } from 'src/services/supplier.service';
import { UserService } from 'src/services/user.service';
import { ProjectManagerEditComponent } from './project-manager-edit.component';
import { of } from 'rxjs';

class UserServiceMock {
  getById() { return of({ _id: '1', name: '', email: '', supplier: { name: '' }, phone: '', document: '' }); }
  updateById() { return of({}); }
}
class SupplierServiceMock {}
class NgxSpinnerServiceMock { show() {}; hide() {} }
class ToastrServiceMock { success() {}; error() {} }
const activatedRouteMock = { params: of({ id: '1' }) };
const routerMock = { navigate: jasmine.createSpy('navigate') };

describe('ProjectManagerEditComponent', () => {
  let component: ProjectManagerEditComponent;
  let fixture: ComponentFixture<ProjectManagerEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectManagerEditComponent ],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: UserService, useClass: UserServiceMock },
        { provide: SupplierService, useClass: SupplierServiceMock },
        { provide: NgxSpinnerService, useClass: NgxSpinnerServiceMock },
        { provide: ToastrService, useClass: ToastrServiceMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: Router, useValue: routerMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectManagerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
