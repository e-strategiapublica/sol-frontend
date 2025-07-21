import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLicitacaoViewProposalComponent } from './admin-licitacao-view-proposal.component';

describe('AdminLicitacaoViewProposalComponent', () => {
  let component: AdminLicitacaoViewProposalComponent;
  let fixture: ComponentFixture<AdminLicitacaoViewProposalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminLicitacaoViewProposalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminLicitacaoViewProposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
