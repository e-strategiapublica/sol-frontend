import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PdmDataComponent } from './pdm-data.component';
import { PdmService } from 'src/services/pdm.service';

class PdmServiceMock {
  getById() { return { subscribe: () => {} }; }
}

describe('PdmDataComponent', () => {
  let component: PdmDataComponent;
  let fixture: ComponentFixture<PdmDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdmDataComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        TranslateModule.forRoot(),
        NgxSpinnerModule
      ],
      providers: [
        { provide: PdmService, useClass: PdmServiceMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PdmDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
