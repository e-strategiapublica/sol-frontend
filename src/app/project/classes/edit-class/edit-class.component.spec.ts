import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { EditClassComponent } from './edit-class.component';
import { CategoryService } from 'src/services/category.service';
import { ClassesService } from 'src/services/classes.service';
import { LocalStorageService } from 'src/services/local-storage.service';
import { TranslateService } from '@ngx-translate/core';

import { of } from 'rxjs';
class CategoryServiceMock {
  getCategory() { return of([]); }
}
class ClassesServiceMock {}
class LocalStorageServiceMock {}
class TranslateServiceMock {}

describe('EditClassComponent', () => {
  let component: EditClassComponent;
  let fixture: ComponentFixture<EditClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditClassComponent ],
      imports: [
        ToastrModule.forRoot(),
        HttpClientTestingModule,
        TranslateModule.forRoot(),
        RouterTestingModule
      ],
      providers: [
        { provide: CategoryService, useClass: CategoryServiceMock },
        { provide: ClassesService, useClass: ClassesServiceMock },
        { provide: LocalStorageService, useClass: LocalStorageServiceMock },
        { provide: TranslateService, useClass: TranslateServiceMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
