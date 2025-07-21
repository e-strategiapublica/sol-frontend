import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastrService, TOAST_CONFIG } from 'ngx-toastr';
import { ToastrServiceMock } from 'src/testing/test-mocks';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { NewClassComponent } from './new-class.component';

describe('NewClassComponent', () => {
  let component: NewClassComponent;
  let fixture: ComponentFixture<NewClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewClassComponent ],
      providers: [
        { provide: ToastrService, useClass: ToastrServiceMock },
        { provide: TOAST_CONFIG, useValue: {} }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
