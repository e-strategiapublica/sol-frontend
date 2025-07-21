import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastrService, TOAST_CONFIG } from 'ngx-toastr';
import { ToastrServiceMock } from 'src/testing/test-mocks';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AssociacaoRegisterLicitacaoComponent } from './associacao-register-licitacao.component';

describe('AssociacaoRegisterLicitacaoComponent', () => {
  let component: AssociacaoRegisterLicitacaoComponent;
  let fixture: ComponentFixture<AssociacaoRegisterLicitacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssociacaoRegisterLicitacaoComponent ],
      providers: [
        { provide: ToastrService, useClass: ToastrServiceMock },
        { provide: TOAST_CONFIG, useValue: {} }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssociacaoRegisterLicitacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
