import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { CreateTimerComponent } from './components/create-timer/create-timer.component';
import { SessionComponent } from './components/session/session.component';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { updateSession } from './shared/store/session/session.actions';

type globalState = {
  canAddSession: boolean;
  canPause: boolean;
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet, 
    CreateTimerComponent,
    SessionComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{

  title = 'PoMo';

  global$: Observable<globalState>;
  
  constructor(private store: Store<{ global: globalState }>) {
    this.global$ = store.select('global');
  }

}
