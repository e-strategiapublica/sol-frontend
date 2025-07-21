import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { AuthService } from 'src/services/auth.service';
import { UserService } from 'src/services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ControlAssociacaoComponent } from './control-associacao.component';

class AuthServiceMock {}
class UserServiceMock {
  listByType() { return of([]); }
  getUserFilterList(): any[] { return []; }
  getUserList(): any[] { return []; }
  setUserFilterList() {}
  setUserList() {}
}
class NgxSpinnerServiceMock { show() {}; hide() {} }
class NgbModalMock { open() { return { result: Promise.resolve() }; } }

describe('ControlAssociacaoComponent', () => {
  let component: ControlAssociacaoComponent;
  let fixture: ComponentFixture<ControlAssociacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlAssociacaoComponent ],
      providers: [
        { provide: AuthService, useClass: AuthServiceMock },
        { provide: UserService, useClass: UserServiceMock },
        { provide: NgxSpinnerService, useClass: NgxSpinnerServiceMock },
        { provide: NgbModal, useClass: NgbModalMock },
      ],
      imports: [HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlAssociacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
