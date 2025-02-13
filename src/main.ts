import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgModuleRef } from '@angular/core';  // Importando de '@angular/core'
import { AppModule } from './app/app.module';

/**
 * Inicializa a aplicação Angular com o módulo especificado.
 * @returns {Promise<void | NgModuleRef<AppModule>>} Uma promessa que é resolvida quando o módulo é inicializado com sucesso, 
 *         ou resolve para void em caso de falha.
 */
function bootstrapApp(): Promise<void | NgModuleRef<AppModule>> {
  return platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err: any) => {
      // Registra o erro no console
      console.error('Erro ao inicializar a aplicação:', err);
    });
}

// Chama a função para inicializar a aplicação
bootstrapApp();
