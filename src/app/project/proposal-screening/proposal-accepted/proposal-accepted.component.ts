import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/services/auth.service';
import { ProposalService } from 'src/services/proposal.service';
import * as XLSX from 'xlsx';
import { RecusarPropostaModalComponent } from '../../associacao-licitacao-view-proposal/components/recusar-proposta-modal/recusar-proposta-modal.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AssociationBidService } from 'src/services/association-bid.service';
import { ProposalGetByBidResponse, ProposalAcceptReviewerDto, ApiErrorResponse } from 'src/app/interface/proposal-response.interface';
import { LicitationInterface } from 'src/app/interface/licitacao.interface';
import { UserInterface } from 'src/app/interface/user.interface';

@Component({
  selector: 'app-proposal-accepted',
  templateUrl: './proposal-accepted.component.html',
  styleUrls: ['./proposal-accepted.component.scss']
})
export class ProposalAcceptedComponent {
  biddingID: number;
  responseBid: any;
  haveAccept: boolean = false;
  responseProposal: any;
  user: any
  constructor(
    private proposalService: ProposalService,
    public authService: AuthService,
    private modalService: NgbModal,
    private translate: TranslateService,
    private location: Location,
    private toastrService: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private spinnerService: NgxSpinnerService,
    private _associationBidService: AssociationBidService,
  ) {

  }
  ngOnInit(): void {
    this.spinnerService.show();
    this.route.params.subscribe((params: any) => {
      const id = params["_id"];
      this.biddingID = Number(id);
      this._associationBidService.getById(id).subscribe({
        next: (data: any) => {
          this.responseBid = data;
          this.getResponse();
        },
        error: (_error: unknown) => {
          this.spinnerService.hide();
        },
      });
    });
  } 
  
  getResponse() {
    const userType = localStorage.getItem('user');
    this.user = userType ? JSON.parse(userType) : null;
    this.proposalService.listProposalByBid(this.responseBid._id).subscribe({
      next: (data: any) => {
        this.responseProposal = data;
        this.responseProposal.proposals.sort((a: { status: string }, b: { status: string }) => {
          if (a.status === 'aceitoAssociacao') {
            return -1;
          }
          if (b.status === 'aceitoAssociacao') {
            return 1;
          }
          return 0;
        });
        this.spinnerService.hide();
      },
      error: (_error: any) => {
      }
    })
  }

  accept(event: { _id: string }) {
    const dto: ProposalAcceptReviewerDto = {
      acceptedRevisorAt:  new Date().toDateString(),
      reviewer_accept:  true
    }
    this.proposalService.acceptProposalReviewer(event._id,dto).subscribe({
      next: (_data: any) => {
        this.toastrService.success(this.translate.instant('TOASTRS.SUCCESS_ACCEPT_PROPOSAL'), '', { progressBar: true });
        this.router.navigate(['/pages/licitacoes/gestor-revisor-licitacao']);
      },
      error: (error: any) => {
        // Verifica se é um erro estruturado - se for, deixa o BackendErrorHandlerService processar
        if (error?.error && typeof error.error === 'object' && error.error.error && error.error.data) {
          // É um erro estruturado, não faz nada aqui - o sistema global vai processar
          console.log('Erro estruturado detectado no componente, deixando sistema global processar');
          return;
        }
        
        // Para erros não estruturados, usa o tratamento antigo
        let errorMessage = error?.error?.errors?.[0] || error?.error?.message || error?.message;
        
        // Traduzir chaves de erro do backend
        if (errorMessage && this.translate.instant(`TOASTRS.${errorMessage}`) !== `TOASTRS.${errorMessage}`) {
          errorMessage = this.translate.instant(`TOASTRS.${errorMessage}`);
        } else if (!errorMessage) {
          errorMessage = this.translate.instant('TOASTRS.ERROR_ACCEPT_PROPOSAL');
        }
        
        this.toastrService.error(errorMessage, '', { progressBar: true });
      }
    })
  }
   

  
  refuse(event: { _id: string }) {
    const dto: ProposalAcceptReviewerDto = {
      acceptedRevisorAt:  new Date().toDateString(),
      reviewer_accept:  false
    }
    this.proposalService.acceptProposalReviewer(event._id,dto).subscribe({
      next: (_data: any) => {

        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                  this.toastrService.success(this.translate.instant('TOASTRS.SUCCESS_REFUSE_PROPOSAL'), '', { progressBar: true });

          this.router.navigate([this.location.path()]);
        });
      },
      error: (_error: any) => {
        this.toastrService.error(this.translate.instant('TOASTRS.ERROR_REFUSE_PROPOSAL'), '', { progressBar: true });
      }
    })

  }

  open() {
    const base64String = this.responseProposal.file;
    const nomeArquivo = 'planilha.xlsx';

    const arquivoDecodificado = atob(base64String);

    const bytes = new Uint8Array(arquivoDecodificado.length);
    for (let i = 0; i < arquivoDecodificado.length; i++) {
      bytes[i] = arquivoDecodificado.charCodeAt(i);
    }

    const workbook = XLSX.read(bytes, { type: 'array' });

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    const excelBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    const excelUrl = URL.createObjectURL(excelBlob);

    const link = document.createElement('a');
    link.href = excelUrl;
    link.download = nomeArquivo;

    link.click();

    URL.revokeObjectURL(excelUrl);
  }

  refused(pro: unknown) {
    localStorage.setItem('proposalAction', JSON.stringify(pro))
    const modalRef = this.modalService.open(RecusarPropostaModalComponent, { centered: true });
    modalRef.result.then((_data: unknown) => {
    }, (_error: unknown) => {
      this.location.back();
    });
  }

  approve(_id: string) {
    this.proposalService.acceptProposal(_id).subscribe({
      next: (_data: any) => {
        this.toastrService.success(this.translate.instant('TOASTRS.SUCCESS_ACCEPT_PROPOSAL'), '', { progressBar: true });
        this.router.navigate(['/pages/licitacoes/gestor-revisor-licitacao']);
      },
      error: (error: any) => {
        let errorMessage = error?.error?.errors?.[0] || error?.error?.message || error?.message;
        
        // Traduzir chaves de erro do backend
        if (errorMessage && this.translate.instant(`TOASTRS.${errorMessage}`) !== `TOASTRS.${errorMessage}`) {
          errorMessage = this.translate.instant(`TOASTRS.${errorMessage}`);
        } else if (!errorMessage) {
          errorMessage = this.translate.instant('TOASTRS.ERROR_ACCEPT_PROPOSAL');
        }
        
        this.toastrService.error(errorMessage, '', { progressBar: true });
      }
    });
  }

}
