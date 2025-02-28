import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
  importProvidersFrom(provideFirebaseApp
    (() => initializeApp(
      { "projectId": "danotes-testproject", "appId": "1:487516549024:web:d3b761022da447a8f9bec5", "storageBucket": "danotes-testproject.firebasestorage.app", "apiKey": "AIzaSyBQVm7FNi2_wGBbhyEm2_6nIsopytT1i0U", "authDomain": "danotes-testproject.firebaseapp.com", "messagingSenderId": "487516549024" }))),
  importProvidersFrom(provideFirestore(() => getFirestore()))]
};
