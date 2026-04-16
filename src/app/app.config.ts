import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { provideHttpClient, withFetch } from '@angular/common/http';

<<<<<<< HEAD
=======
// Registrar idioma español
>>>>>>> 4ceee10 (actualizacion de admin)
registerLocaleData(localeEs);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
<<<<<<< HEAD
    provideHttpClient(withFetch()),
    { provide: LOCALE_ID, useValue: 'es-CO' }
=======
    
     { provide: LOCALE_ID, useValue: 'es-CO' },

     provideHttpClient(withFetch())
>>>>>>> 4ceee10 (actualizacion de admin)
  ]
}