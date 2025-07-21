import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthServiceMock, ToastrServiceMock, NgxSpinnerServiceMock } from 'src/testing/test-mocks';

import { AdministrationDetailLicitacaoComponent } from './administration-detail-licitacao.component';

describe('AdministrationDetailLicitacaoComponent', () => {
  let component: AdministrationDetailLicitacaoComponent;
  let fixture: ComponentFixture<AdministrationDetailLicitacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministrationDetailLicitacaoComponent ],
      imports: [HttpClientTestingModule, TranslateModule.forRoot()],
      providers: [
        { provide: AuthService, useClass: AuthServiceMock },
        { provide: ToastrService, useClass: ToastrServiceMock },
        { provide: NgxSpinnerService, useClass: NgxSpinnerServiceMock },
        { provide: TranslateService, useValue: { instant: () => '', get: () => '' } },
        { provide: ActivatedRoute, useValue: { snapshot: { params: {} } } },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministrationDetailLicitacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
