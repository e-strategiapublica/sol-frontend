import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrServiceMock, NgxSpinnerServiceMock } from 'src/testing/test-mocks';

import { CancelarLicitacaoComponent } from './cancelar-licitacao.component';

describe('CancelarLicitacaoComponent', () => {
  let component: CancelarLicitacaoComponent;
  let fixture: ComponentFixture<CancelarLicitacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancelarLicitacaoComponent ],
      imports: [HttpClientTestingModule, TranslateModule.forRoot()],
      providers: [
        { provide: ToastrService, useClass: ToastrServiceMock },
        { provide: NgxSpinnerService, useClass: NgxSpinnerServiceMock },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancelarLicitacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
