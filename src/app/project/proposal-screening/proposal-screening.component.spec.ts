import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { ProposalScreeningComponent } from './proposal-screening.component';

describe('ProposalScreeningComponent', () => {
  let component: ProposalScreeningComponent;
  let fixture: ComponentFixture<ProposalScreeningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProposalScreeningComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProposalScreeningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
