import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractTemplatesComponent } from './contract-templates.component';
import { ModelContractService } from 'src/services/model-contract.service';
import { ModelContractServiceMock, ToastrServiceMock } from 'src/testing/test-mocks';
import { ToastrService } from 'ngx-toastr';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ContractTemplatesComponent', () => {
  let component: ContractTemplatesComponent;
  let fixture: ComponentFixture<ContractTemplatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractTemplatesComponent ],
      providers: [
        { provide: ToastrService, useClass: ToastrServiceMock },
        { provide: ModelContractService, useClass: ModelContractServiceMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
