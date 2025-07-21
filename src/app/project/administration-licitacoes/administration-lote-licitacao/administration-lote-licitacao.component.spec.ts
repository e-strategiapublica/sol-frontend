import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AdministrationLoteLicitacaoComponent } from './administration-lote-licitacao.component';
import { of } from 'rxjs';

class DatamockServiceMock {}
class NgxSpinnerServiceMock { show() {}; hide() {} }
class AssociationBidServiceMock { getById() { return of({}); } }
const routerMock = { navigate: jasmine.createSpy('navigate') };
const activatedRouteMock = { params: of({ _id: '1' }), snapshot: { params: { _id: '1' } } };

describe('AdministrationLoteLicitacaoComponent', () => {
  let component: AdministrationLoteLicitacaoComponent;
  let fixture: ComponentFixture<AdministrationLoteLicitacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministrationLoteLicitacaoComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [
        { provide: 'DatamockService', useClass: DatamockServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: 'NgxSpinnerService', useClass: NgxSpinnerServiceMock },
        { provide: 'AssociationBidService', useClass: AssociationBidServiceMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministrationLoteLicitacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
