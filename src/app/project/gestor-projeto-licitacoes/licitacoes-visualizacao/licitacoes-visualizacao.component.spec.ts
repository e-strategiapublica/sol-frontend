import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { AssociationBidService } from 'src/services/association-bid.service';
import { AuthServiceMock } from 'src/testing/test-mocks';
import { AssociationServiceMock } from 'src/testing/test-mocks';

import { LicitacoesVisualizacaoComponent } from './licitacoes-visualizacao.component';

describe('LicitacoesVisualizacaoComponent', () => {
  let component: LicitacoesVisualizacaoComponent;
  let fixture: ComponentFixture<LicitacoesVisualizacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LicitacoesVisualizacaoComponent ],
      imports: [HttpClientTestingModule, TranslateModule.forRoot()],
      providers: [
        { provide: AuthService, useClass: AuthServiceMock },
        { provide: AssociationBidService, useClass: AssociationServiceMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LicitacoesVisualizacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
