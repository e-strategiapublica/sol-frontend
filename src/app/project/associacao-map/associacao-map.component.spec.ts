import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { AssociacaoMapComponent } from './associacao-map.component';
import { AuthService } from '../../../services/auth.service';
import { AssociationService } from '../../../services/association.service';
import { SupplierService } from '../../../services/supplier.service';
import { UserService } from '../../../services/user.service';

class AuthServiceMock {
  getAuthenticatedUser() { return { id: 1 }; }
}
class AssociationServiceMock {}
class SupplierServiceMock {
  supplierList() { return of([]); }
}
class UserServiceMock {
  getById() { return of({ association: { address: { latitude: '0', longitude: '0' } }, name: '', document: '' }); }
}

describe('AssociacaoMapComponent', () => {
  let component: AssociacaoMapComponent;
  let fixture: ComponentFixture<AssociacaoMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssociacaoMapComponent ],
      providers: [
        { provide: AuthService, useClass: AuthServiceMock },
        { provide: AssociationService, useClass: AssociationServiceMock },
        { provide: SupplierService, useClass: SupplierServiceMock },
        { provide: UserService, useClass: UserServiceMock },
      ],
      imports: [HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssociacaoMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
