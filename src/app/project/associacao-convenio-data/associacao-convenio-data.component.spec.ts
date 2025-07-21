import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { AssociacaoConvenioDataComponent } from './associacao-convenio-data.component';

class NgbModalMock {
  open() { return { result: Promise.resolve() }; }
  dismissAll() {}
}
class AuthServiceMock {}
const activatedRouteMock = { data: of({ agreement: {} }) };
const routerMock = { navigate: jasmine.createSpy('navigate') };


describe('AssociacaoConvenioDataComponent', () => {
  let component: AssociacaoConvenioDataComponent;
  let fixture: ComponentFixture<AssociacaoConvenioDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssociacaoConvenioDataComponent ],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: NgbModal, useClass: NgbModalMock },
        { provide: FormBuilder, useClass: FormBuilder },
        { provide: 'AuthService', useClass: AuthServiceMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: Router, useValue: routerMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssociacaoConvenioDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
