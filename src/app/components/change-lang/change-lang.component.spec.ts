import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/services/auth.service';

import { ChangeLangComponent } from './change-lang.component';

describe('ChangeLangComponent', () => {
  let component: ChangeLangComponent;
  let fixture: ComponentFixture<ChangeLangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeLangComponent ],
      imports: [TranslateModule.forRoot()],
      providers: [TranslateService, { provide: AuthService, useClass: class { } }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeLangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
