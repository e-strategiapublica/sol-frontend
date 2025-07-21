// Utilitários de mocks para testes unitários Angular
import { of } from 'rxjs';

export class AuthServiceMock {}
export class UserServiceMock {
  listByType() { return of([]); }
  getUserFilterList(): any[] { return []; }
  getUserList(): any[] { return []; }
  setUserFilterList() {}
  setUserList() {}
}
export class NgxSpinnerServiceMock { show() {}; hide() {} }
export class ToastrServiceMock { success() {}; error() {}; info() {}; warning() {} }
export class ReportsServiceMock {}
export class ModelContractServiceMock {}
export class CostItemsServiceMock {}
export class AssociationServiceMock {}
export const ToastConfigMock = {};
