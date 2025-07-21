import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { UserService } from 'src/services/user.service';
import { AuthService } from 'src/services/auth.service';
import { ToastrService, TOAST_CONFIG } from 'ngx-toastr';
import { UserServiceMock, AuthServiceMock, ToastrServiceMock, ToastConfigMock } from 'src/testing/test-mocks';

import { UserDataAdministracaoComponent } from './user-data-administracao.component';

describe('UserDataAdministracaoComponent', () => {
  let component: UserDataAdministracaoComponent;
  let fixture: ComponentFixture<UserDataAdministracaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDataAdministracaoComponent ],
      imports: [HttpClientTestingModule, TranslateModule.forRoot()],
      providers: [
        { provide: UserService, useClass: UserServiceMock },
        { provide: AuthService, useClass: AuthServiceMock },
        { provide: ToastrService, useClass: ToastrServiceMock },
        { provide: TOAST_CONFIG, useValue: ToastConfigMock },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDataAdministracaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
