import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from 'src/services/auth.service';
import { AuthServiceMock } from 'src/testing/test-mocks';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ControlAdministracaoComponent } from './control-administracao.component';

describe('ControlAdministracaoComponent', () => {
  let component: ControlAdministracaoComponent;
  let fixture: ComponentFixture<ControlAdministracaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlAdministracaoComponent ],
      providers: [
        { provide: AuthService, useClass: AuthServiceMock }
      ],
      imports: [
        TranslateModule.forRoot(),
        HttpClientTestingModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlAdministracaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
