import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReportsService } from 'src/services/reports.service';
import { ReportsServiceMock } from 'src/testing/test-mocks';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ReportGeneratedComponent } from './report-generated.component';

describe('ReportGeneratedComponent', () => {
  let component: ReportGeneratedComponent;
  let fixture: ComponentFixture<ReportGeneratedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportGeneratedComponent ],
      imports: [HttpClientTestingModule, TranslateModule.forRoot(), NgxPaginationModule],
      providers: [
        { provide: ReportsService, useClass: ReportsServiceMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportGeneratedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('ReportGeneratedComponent', () => {
  let component: ReportGeneratedComponent;
  let fixture: ComponentFixture<ReportGeneratedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportGeneratedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportGeneratedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
