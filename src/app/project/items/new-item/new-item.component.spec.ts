import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ToastrService, TOAST_CONFIG } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { ToastrServiceMock, ToastConfigMock, AuthServiceMock } from 'src/testing/test-mocks';

import { NewItemComponent } from './new-item.component';

describe('NewItemComponent', () => {
  let component: NewItemComponent;
  let fixture: ComponentFixture<NewItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewItemComponent ],
      imports: [HttpClientTestingModule, TranslateModule.forRoot(), ReactiveFormsModule],
      providers: [
        { provide: ToastrService, useClass: ToastrServiceMock },
        { provide: TOAST_CONFIG, useValue: ToastConfigMock },
        { provide: ActivatedRoute, useValue: { snapshot: { params: {} } } },
        { provide: AuthService, useClass: AuthServiceMock },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
