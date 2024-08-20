import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AssociationBidService } from 'src/services/association-bid.service';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-associacao-licitacao',
  templateUrl: './associacao-licitacao.component.html',
  styleUrls: ['./associacao-licitacao.component.scss']
})
export class AssociacaoLicitacaoComponent {
  licitacoesList: any = [];
  staticLicitacoesList: any = [];

  filtered: boolean = false;

  currentPage: number = 1;
  itensPerPage: number = 6;

  constructor(
    private authService: AuthService,
    private router: Router,
    private _associationBidService: AssociationBidService,
    private ngxSpinnerService: NgxSpinnerService,
  ) {
  }

  ngOnInit(): void {
    this.listBid();
  }

  async listBid() {
    this._associationBidService.listByAssociation().subscribe({
      next: (data: any) => {
        this.ngxSpinnerService.hide();
        const List = Object.values(data);
        this.licitacoesList = List.filter((item: any) => item.deleted === false);        
        this.licitacoesList.sort((a: any, b: any) => b.bid_count - a.bid_count)
        this.staticLicitacoesList = this.licitacoesList;
      }
    })
  }

  async filterBid(event: any) {
    this.ngxSpinnerService.show();

    if (event.target.value !== 'all') {
      this._associationBidService.list().subscribe({
        next: data => {

          const name = this.staticLicitacoesList.filter((obj: any) => ((obj.association.association.name).toLowerCase()).includes(event.target.value.toLowerCase()));
          const bid_count = this.staticLicitacoesList.filter((obj: any) => ((obj.bid_count).toLowerCase()).includes(event.target.value.toLowerCase()));
          const status = this.staticLicitacoesList.filter((obj: any) => ((obj.status).toLowerCase()).includes(event.target.value.toLowerCase()));
          
          const array = [...name, ...bid_count, ...status]        
          const dataArr = new Set(array)
          const result = [...dataArr];         

          this.licitacoesList = result

          this.ngxSpinnerService.hide();
        }
      })
    } else {
      this.listBid();
    }

  }

  detailBids(i: any) {
    this.router.navigate(['/pages/licitacoes/licitacao-data', i._id]);
  }

  editBids(i: any) {
    this.router.navigate(['/pages/licitacoes/licitacao-edit', i._id]);
  }

}
