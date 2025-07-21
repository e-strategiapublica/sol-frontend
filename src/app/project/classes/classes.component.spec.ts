import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxPaginationModule } from 'ngx-pagination';
import { AuthService } from 'src/services/auth.service';
import { AuthServiceMock } from 'src/testing/test-mocks';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ClassesComponent } from './classes.component';

describe('ClassesComponent', () => {
  let component: ClassesComponent;
  let fixture: ComponentFixture<ClassesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassesComponent ],
      providers: [
        { provide: AuthService, useClass: AuthServiceMock }
      ],
      imports: [
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: AuthServiceMock }
        }),
        HttpClientTestingModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
