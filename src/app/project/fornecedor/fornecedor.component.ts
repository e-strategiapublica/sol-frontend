import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteFornecedorComponent } from './delete-fornecedor/delete-fornecedor.component';
import { ToastrService } from 'ngx-toastr';
import { SupplierService } from '../../../services/supplier.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Fuse from 'fuse.js';
import { AuthService } from 'src/services/auth.service';
import { SupplierGetResponseDto } from 'src/dtos/supplier/supplier-get-response.dto';                                     

@Component({
  selector: 'app-fornecedor',
  templateUrl: './fornecedor.component.html',
  styleUrls: ['./fornecedor.component.scss']
})
export class FornecedorComponent implements OnInit, OnDestroy, AfterViewInit {

  currentPage: number = 1;
  itensPerPage: number = 8;
  fornecedor: SupplierGetResponseDto[] = [];
  fornecedorFilter: SupplierGetResponseDto[] = [];
  form: FormGroup;
  private fuse: Fuse<SupplierGetResponseDto> | null = null;
  private searchInputListener?: EventListener;
  private valueChangesSubscription: any;

  @ViewChild('searchInput', { static: false }) searchInputRef!: ElementRef;

  constructor(
    public authService: AuthService,
    private formBuilder: FormBuilder,
    private ngbModal: NgbModal,
    private toastrService: ToastrService,
    private _supplierService: SupplierService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      search: [''],
    });
  }

  ngOnInit(): void {
    const id = localStorage.getItem('id_fornecedor');
    if(id && id == '0'){      
      localStorage.removeItem('id_fornecedor')
      this.fornecedorFilter = this._supplierService.getFornecedorFilterList();
      this.fornecedor = this._supplierService.getFornecedorList();
      this.setupFuse();
    }else{
      this.list();
    }

    this.valueChangesSubscription = this.form.controls['search'].valueChanges.subscribe((text: string) => {
      this.applyFilter(text);
    });
  }

  ngAfterViewInit(): void {
    // Adiciona listener do Enter após view inicializada
    const input = document.querySelector('input[formControlName="search"]');
    if (input) {
      this.searchInputListener = (event: Event) => {
        const keyboardEvent = event as KeyboardEvent;
        if (keyboardEvent.key === 'Enter') {
          keyboardEvent.preventDefault();
        }
      };
      input.addEventListener('keydown', this.searchInputListener);
    }
  }

  ngOnDestroy(): void {
    // Remove o listener do Enter para evitar vazamento de memória
    const input = document.querySelector('input[formControlName="search"]');
    if (input && this.searchInputListener) {
      input.removeEventListener('keydown', this.searchInputListener);
    }
    if (this.valueChangesSubscription) {
      this.valueChangesSubscription.unsubscribe();
    }
  }

  private setupFuse(): void {
    if (typeof Fuse !== 'undefined' && this.fornecedor && this.fornecedor.length > 0) {
      this.fuse = new Fuse(this.fornecedor, {
        keys: [
          {
            name: 'name',
            getFn: (obj: any) => obj.name || ''
          },
          {
            name: 'cpf',
            getFn: (obj: any) => obj.cpf || ''
          },
          {
            name: 'address.city',
            getFn: (obj: any) => obj.address && obj.address.city ? obj.address.city : ''
          }
        ],
        threshold: 0.4,
        ignoreLocation: true,
        minMatchCharLength: 1
      });
    } else {
      this.fuse = null;
    }
  }

  private applyFilter(text: string): void {
    if (text && text.trim().length > 0) {
      if (this.fuse) {
        const result = this.fuse.search(text).map(res => res.item);
        this.fornecedorFilter = result;
      } else {
        const lowerText = text.toLowerCase();
        this.fornecedorFilter = this.fornecedor.filter(item =>
          (item.name && item.name.toLowerCase().includes(lowerText)) ||
          (item.cpf && item.cpf.toLowerCase().includes(lowerText)) ||
          (item.address && item.address.city && item.address.city.toLowerCase().includes(lowerText))
        );
      }
    } else {
      this.fornecedorFilter = this.fornecedor;
    }
  }

  list() {
    this._supplierService.supplierList().subscribe((response: any) => {
      this.fornecedor = response;
      this.fornecedorFilter = response;
      this._supplierService.setFornecedorFilterList(response);
      this._supplierService.setFornecedorList(response);
      this.setupFuse();
    });
  }

  openModal(fornecedor: any) {
    const modalRef = this.ngbModal.open(DeleteFornecedorComponent, {
      centered: true,
      backdrop: true,
      size: 'md',
    });
    modalRef.componentInstance.fornecedor = fornecedor;
    modalRef.result.then(data => {
      this.list()
    }, error => {
      console.error('error', error);
    });
  }

  navigateToItem(id: string) {
    this.router.navigate(['/pages/fornecedor/dados-fornecedor/' + id]);
  }
}