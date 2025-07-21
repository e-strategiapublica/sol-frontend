import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from 'src/services/auth.service';
import { AuthServiceMock } from 'src/testing/test-mocks';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { FornecedorMapComponent } from './fornecedor-map.component';

describe('FornecedorMapComponent', () => {
  let component: FornecedorMapComponent;
  let fixture: ComponentFixture<FornecedorMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FornecedorMapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FornecedorMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
