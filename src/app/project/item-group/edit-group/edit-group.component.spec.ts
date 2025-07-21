import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CostItemsService } from 'src/services/cost-items.service';
import { AuthService } from 'src/services/auth.service';
import { ToastrService, TOAST_CONFIG } from 'ngx-toastr';
import { CostItemsServiceMock, AuthServiceMock, ToastrServiceMock, ToastConfigMock } from 'src/testing/test-mocks';

import { EditGroupComponent } from './edit-group.component';

describe('EditGroupComponent', () => {
  let component: EditGroupComponent;
  let fixture: ComponentFixture<EditGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditGroupComponent ],
      imports: [HttpClientTestingModule, TranslateModule.forRoot()],
      providers: [
        { provide: CostItemsService, useClass: CostItemsServiceMock },
        { provide: AuthService, useClass: AuthServiceMock },
        { provide: ToastrService, useClass: ToastrServiceMock },
        { provide: TOAST_CONFIG, useValue: ToastConfigMock },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
