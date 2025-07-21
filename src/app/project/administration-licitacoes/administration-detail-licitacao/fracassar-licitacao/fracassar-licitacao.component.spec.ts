import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AssociationBidService } from 'src/services/association-bid.service';
import { AuthService } from 'src/services/auth.service';
import { AssociationServiceMock, AuthServiceMock } from 'src/testing/test-mocks';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrServiceMock, NgxSpinnerServiceMock } from 'src/testing/test-mocks';

import { FracassarLicitacaoComponent } from './fracassar-licitacao.component';

describe('FracassarLicitacaoComponent', () => {
  let component: FracassarLicitacaoComponent;
  let fixture: ComponentFixture<FracassarLicitacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FracassarLicitacaoComponent ],
      imports: [HttpClientTestingModule, TranslateModule.forRoot()],
      providers: [
        { provide: AssociationBidService, useClass: AssociationServiceMock },
        { provide: AuthService, useClass: AuthServiceMock },
        { provide: ToastrService, useClass: ToastrServiceMock },
        { provide: NgxSpinnerService, useClass: NgxSpinnerServiceMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FracassarLicitacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
