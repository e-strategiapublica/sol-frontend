import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AllotmentStatusEnum } from 'src/enums/allotment-status.enum';
import { BidStatusEnum } from 'src/enums/bid-status.enum';
import { AssociationBidService } from 'src/services/association-bid.service';
import { DatamockService } from 'src/services/datamock.service';

@Component({
  selector: 'app-administration-lote-licitacao',
  templateUrl: './administration-lote-licitacao.component.html',
  styleUrls: ['./administration-lote-licitacao.component.scss']
})
export class AdministrationLoteLicitacaoComponent {
  response: any;
  biddingID : string;

  bidStatusEnum = BidStatusEnum;

  constructor(
    public datamock: DatamockService,
    private router: Router,
    private route: ActivatedRoute,
    private spinnerService: NgxSpinnerService,
    private _associationBidService: AssociationBidService,
  ) { }

  ngOnInit(): void {
    this.spinnerService.show();
    this.route.params.subscribe(params => {
      const id = params["_id"];
      this.biddingID = id;
      this._associationBidService.getById(id).subscribe({
        next: data => {
          console.log(data);
          this.response = data;
          this.spinnerService.hide();
        },
        error: error => {
          this.spinnerService.hide();
          console.error(error);
        },
      });
    });
  }
  open() {
    this.router.navigate(["/pages/proposal-screening/proposal-accepted", this.response._id])
  }

  getStatusClass(status: string): string {
    switch (status) {
      case AllotmentStatusEnum.aberta:
        return 'text-primary';
      case AllotmentStatusEnum.cancelado:
      case AllotmentStatusEnum.deserto:
      case AllotmentStatusEnum.fracassado:
        return 'text-danger';
      case AllotmentStatusEnum.adjudicado:
        return 'text-success';
      case AllotmentStatusEnum.rascunho:
        return 'text-dark';
      default:
        return '';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case AllotmentStatusEnum.aberta:
        return 'Aberta';
      case AllotmentStatusEnum.cancelado:
        return 'Cancelado';
      case AllotmentStatusEnum.deserto:
        return 'Deserto';
      case AllotmentStatusEnum.fracassado:
        return 'Fracassado';
      case AllotmentStatusEnum.adjudicado:
        return 'Adjudicado';
      case AllotmentStatusEnum.rascunho:
        return 'Rascunho';
      default:
        return '';
    }
  }

}

