import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { of } from 'rxjs';
import { AssociacaoLicitacaoViewProposalComponent } from './associacao-licitacao-view-proposal.component';

class ProposalServiceMock {
  listProposalByBid() { return of({ proposals: [] }); }
  acceptProposalReviewer() { return of({}); }
  acceptProposal() { return of({}); }
}
class AuthServiceMock {}
class NgbModalMock {
  open() { return { result: Promise.resolve() }; }
}
class ToastrServiceMock { success() {}; error() {} }
class TranslateServiceMock { instant(key: string) { return key; } }
class NgxSpinnerServiceMock { show() {}; hide() {} }
class AssociationBidServiceMock { getById() { return of({}); } }
const routerMock = { navigate: jasmine.createSpy('navigate'), navigateByUrl: jasmine.createSpy('navigateByUrl') };
const activatedRouteMock = { params: of({ _id: 1 }) };
const locationMock = { path: () => '', back: jasmine.createSpy('back') };

describe('AssociacaoLicitacaoViewProposalComponent', () => {
  let component: AssociacaoLicitacaoViewProposalComponent;
  let fixture: ComponentFixture<AssociacaoLicitacaoViewProposalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssociacaoLicitacaoViewProposalComponent ],
      imports: [
        HttpClientTestingModule,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: 'ProposalService', useClass: ProposalServiceMock },
        { provide: 'AuthService', useClass: AuthServiceMock },
        { provide: NgbModal, useClass: NgbModalMock },
        { provide: TranslateService, useClass: TranslateServiceMock },
        { provide: Location, useValue: locationMock },
        { provide: 'ToastrService', useClass: ToastrServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: NgxSpinnerService, useClass: NgxSpinnerServiceMock },
        { provide: 'AssociationBidService', useClass: AssociationBidServiceMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssociacaoLicitacaoViewProposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
