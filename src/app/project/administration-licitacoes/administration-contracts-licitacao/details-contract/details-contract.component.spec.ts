import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrServiceMock, NgxSpinnerServiceMock } from 'src/testing/test-mocks';

import { DetailsContractComponent } from './details-contract.component';

describe('DetailsContractComponent', () => {
  let component: DetailsContractComponent;
  let fixture: ComponentFixture<DetailsContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsContractComponent ],
      imports: [HttpClientTestingModule, TranslateModule.forRoot()],
      providers: [
        { provide: ToastrService, useClass: ToastrServiceMock },
        { provide: NgxSpinnerService, useClass: NgxSpinnerServiceMock },
        { provide: TranslateService, useValue: { instant: () => '', get: () => '' } },
        { provide: ActivatedRoute, useValue: { snapshot: { params: {} } } },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
