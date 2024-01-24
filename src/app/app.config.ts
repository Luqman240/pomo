import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { sessionReducer } from './shared/store/session/session.reducer';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { taskReducer } from './shared/store/task/task.reducer';
import { globalReducer } from './shared/store/global/global.reducer';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore({session:sessionReducer, tasks:taskReducer, global:globalReducer}),
    provideStoreDevtools({ maxAge: 25, logOnly: false }),

  ],
};
