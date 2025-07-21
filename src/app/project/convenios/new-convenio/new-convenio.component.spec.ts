import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { of } from 'rxjs';
import { NewConvenioComponent } from './new-convenio.component';

class AssociationServiceMock {
  list() { return of([]); }
}
class ConvenioServiceMock {
  register() { return of({}); }
}
class UserServiceMock {
  listByType() { return of([]); }
  listByRole() { return of([]); }
}
class ToastrServiceMock { success() {}; error() {} }
class ProjectsServiceMock {
  getProjects() { return of([]); }
}
const routerMock = { navigate: jasmine.createSpy('navigate') };
const locationMock = { back: jasmine.createSpy('back') };

describe('NewConvenioComponent', () => {
  let component: NewConvenioComponent;
  let fixture: ComponentFixture<NewConvenioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewConvenioComponent ],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: 'AssociationService', useClass: AssociationServiceMock },
        { provide: 'ConvenioService', useClass: ConvenioServiceMock },
        { provide: 'UserService', useClass: UserServiceMock },
        { provide: 'ToastrService', useClass: ToastrServiceMock },
        { provide: 'ProjectsService', useClass: ProjectsServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: Location, useValue: locationMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewConvenioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
