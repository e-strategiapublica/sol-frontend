import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditContractTemplatesComponent } from './edit-contract-templates.component';

import { ModelContractService } from 'src/services/model-contract.service';
import { ModelContractServiceMock, ToastrServiceMock } from 'src/testing/test-mocks';
import { ToastrService } from 'ngx-toastr';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('EditContractTemplatesComponent', () => {
  let component: EditContractTemplatesComponent;
  let fixture: ComponentFixture<EditContractTemplatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditContractTemplatesComponent ],
      providers: [
        { provide: ToastrService, useClass: ToastrServiceMock },
        { provide: ModelContractService, useClass: ModelContractServiceMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditContractTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
