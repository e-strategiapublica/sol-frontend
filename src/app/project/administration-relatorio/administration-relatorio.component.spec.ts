import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from 'src/services/auth.service';
import { AuthServiceMock } from 'src/testing/test-mocks';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AdministrationRelatorioComponent } from './administration-relatorio.component';

describe('AdministrationRelatorioComponent', () => {
  let component: AdministrationRelatorioComponent;
  let fixture: ComponentFixture<AdministrationRelatorioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministrationRelatorioComponent ],
      providers: [
        { provide: AuthService, useClass: AuthServiceMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministrationRelatorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
