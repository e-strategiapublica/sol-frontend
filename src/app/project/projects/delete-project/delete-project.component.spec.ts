import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { DeleteProjectComponent } from './delete-project.component';

describe('DeleteProjectComponent', () => {
  let component: DeleteProjectComponent;
  let fixture: ComponentFixture<DeleteProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteProjectComponent ],
      providers: [
        { provide: NgbActiveModal, useValue: {} }
      ],
      imports: [
        TranslateModule.forRoot(),
        HttpClientTestingModule
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
