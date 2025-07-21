import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { AuthService } from 'src/services/auth.service';
import { AuthServiceMock } from 'src/testing/test-mocks';

import { ProdutosComponent } from './produtos.component';

describe('ProdutosComponent', () => {
  let component: ProdutosComponent;
  let fixture: ComponentFixture<ProdutosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdutosComponent ],
      imports: [HttpClientTestingModule, TranslateModule.forRoot(), NgxPaginationModule],
      providers: [
        { provide: AuthService, useClass: AuthServiceMock },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdutosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
