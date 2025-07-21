import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { AssociationBidService } from 'src/services/association-bid.service';
import { AssociationServiceMock, ToastrServiceMock, NgxSpinnerServiceMock } from 'src/testing/test-mocks';

import { AdministrationSetTimeComponent } from './administration-set-time.component';

describe('AdministrationSetTimeComponent', () => {
  let component: AdministrationSetTimeComponent;
  let fixture: ComponentFixture<AdministrationSetTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministrationSetTimeComponent ],
      imports: [HttpClientTestingModule, TranslateModule.forRoot()],
      providers: [
        { provide: AssociationBidService, useClass: AssociationServiceMock },
        { provide: ToastrService, useClass: ToastrServiceMock },
        { provide: NgxSpinnerService, useClass: NgxSpinnerServiceMock },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministrationSetTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
