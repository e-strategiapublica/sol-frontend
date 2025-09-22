import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { PwaManagerService } from './services/pwa-manager.service';
import { ServiceWorkerService } from './services/service-worker.service';
import { PwaInstallService } from './services/pwa-install.service';
import { PwaInstallBannerComponent } from './components/pwa-install-banner.component';

@NgModule({
  declarations: [
    PwaInstallBannerComponent
  ],
  imports: [
    CommonModule,
    TranslateModule
  ],
  providers: [
    PwaManagerService,
    ServiceWorkerService,
    PwaInstallService
  ],
  exports: [
    PwaInstallBannerComponent
  ]
})
export class PwaModule { }
