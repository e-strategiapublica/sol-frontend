import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { CreateProjectComponent } from './create-project.component';

class UserServiceMock {
  listByType() { return of([]); }
  listByRole() { return of([]); }
}
class ProjectsServiceMock {
  registerProject() { return of({}); }
  getProjects() { return of([]); }
}
class ToastrServiceMock { success() {}; error() {} }
class ConvenioServiceMock {}
class NominatimServiceMock {}
class CepServiceMock {}
const routerMock = { navigate: jasmine.createSpy('navigate'), navigateByUrl: jasmine.createSpy('navigateByUrl') };
class TranslateServiceMock {
  instant(key: string) { return key; }
}

describe('CreateProjectComponent', () => {
  let component: CreateProjectComponent;
  let fixture: ComponentFixture<CreateProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateProjectComponent ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: 'UserService', useClass: UserServiceMock },
        { provide: 'ProjectsService', useClass: ProjectsServiceMock },
        { provide: 'ToastrService', useClass: ToastrServiceMock },
        { provide: 'ConvenioService', useClass: ConvenioServiceMock },
        { provide: 'NominatimService', useClass: NominatimServiceMock },
        { provide: 'CepService', useClass: CepServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: TranslateService, useClass: TranslateServiceMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
