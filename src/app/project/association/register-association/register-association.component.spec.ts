import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AssociationService } from 'src/services/association.service';
import { AssociationServiceMock } from 'src/testing/test-mocks';

import { RegisterAssociationComponent } from './register-association.component';

describe('RegisterAssociationComponent', () => {
  let component: RegisterAssociationComponent;
  let fixture: ComponentFixture<RegisterAssociationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterAssociationComponent ],
      imports: [HttpClientTestingModule, TranslateModule.forRoot()],
      providers: [
        { provide: AssociationService, useClass: AssociationServiceMock },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterAssociationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
