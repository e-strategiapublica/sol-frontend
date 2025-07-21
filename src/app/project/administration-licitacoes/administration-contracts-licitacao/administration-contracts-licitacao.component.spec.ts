import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxSpinnerServiceMock } from 'src/testing/test-mocks';

import { AdministrationContractsLicitacaoComponent } from './administration-contracts-licitacao.component';

describe('AdministrationContractsLicitacaoComponent', () => {
  let component: AdministrationContractsLicitacaoComponent;
  let fixture: ComponentFixture<AdministrationContractsLicitacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministrationContractsLicitacaoComponent ],
      imports: [HttpClientTestingModule, TranslateModule.forRoot()],
      providers: [
        { provide: NgxSpinnerService, useClass: NgxSpinnerServiceMock },
        { provide: TranslateService, useValue: { instant: () => '', get: () => '' } },
        { provide: ActivatedRoute, useValue: { snapshot: { params: {} } } },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministrationContractsLicitacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
