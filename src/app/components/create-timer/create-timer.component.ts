import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Session } from '../../shared/types/session';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { updateSession } from '../../shared/store/session/session.actions';
import { sessionState } from '../../shared/store/global/global.actions';

@Component({
  selector: 'app-create-timer',
  standalone: true,
  imports: [
    FormsModule,ReactiveFormsModule,CommonModule
  ],
  templateUrl: './create-timer.component.html',
  styleUrl: './create-timer.component.css'
})
export class CreateTimerComponent{

  goal = new FormControl('');
  workDuration = new FormControl('');
  pauseDuration = new FormControl('');
  loop = new FormControl(0);

  session$: Observable<Session>;

  constructor(private store: Store<{ session: Session, global:boolean }>) {
    this.session$ = store.select('session');
    this.session$.subscribe(state=>{
      this.goal = new FormControl(state.goal);
      this.workDuration = new FormControl(state.workDuration);
      this.pauseDuration = new FormControl(state.pauseDuration);
      this.loop = new FormControl(state.loop);
    })
  }

  addSession(){
    let newSession : Session = {
      goal:this.goal.value!, 
      workDuration:this.workDuration.value!, 
      pauseDuration:this.pauseDuration.value!, 
      loop:this.loop.value!,
      remainingLoop : this.loop.value!,
      remainingWorkDuration:this.workDuration.value!,
      remainingPauseDuration:this.pauseDuration.value!,

    };
    this.store.dispatch(updateSession({updatedSession:newSession}));
    this.session$.subscribe(state=>{
      console.log("Updated Session : ", state)
    })
    this.store.dispatch(sessionState())
  }

}
