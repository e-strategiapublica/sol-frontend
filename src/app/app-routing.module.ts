import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { inject } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '',
    canActivate: [() => {
      const authService = inject(AuthService);
      if (authService.getAuthenticatedUser() && authService.isJwtValid()) {
        // Usuário autenticado
        window.location.href = '/pages/dashboard';
        return false;
      } else {
        // Não autenticado
        window.location.href = '/accounts/login';
        return false;
      }
    }],
  },
  {
    path: 'accounts',
    loadChildren: () =>
      import('./accounts/account.module')
        .then(a => a.AccountModule)
  },
  {
    path: 'pages',
    loadChildren: () =>
      import('./project/pages.module')
        .then(a => a.PagesModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
