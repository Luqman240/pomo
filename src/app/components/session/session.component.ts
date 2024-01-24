import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Session } from '../../shared/types/session';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Task } from '../../shared/types/task';
import { TasksComponent } from '../tasks/tasks.component';
import { reset, updateSession } from '../../shared/store/session/session.actions';
import { pauseState, sessionState } from '../../shared/store/global/global.actions';

type globalState = {
  canAddSession: boolean;
  canPause: boolean;
};

@Component({
  selector: 'app-session',
  standalone: true,
  imports: [
    CommonModule,
    TasksComponent
  ],
  templateUrl: './session.component.html',
  styleUrl: './session.component.css'
})
export class SessionComponent implements OnInit{

  session$ : Observable<Session>;
  tasks$ : Observable<Array<Task>>;
  global$ : Observable<globalState>;

  workTimeArray : Array<string> | undefined;
  workTotalSeconds : number = 0;
  workTimer : string | undefined;

  pauseTimeArray : Array<string> | undefined;
  pauseTotalSeconds : number = 0;
  pauseTimer : string | undefined;

  workTimerInterval: any;
  pauseTimerInterval: any;
  
  boolTimer : boolean = false;
  remainingLoop : number = 0;

  canPauseActualTime : boolean = false;

  constructor(private store: Store<{ session: Session, tasks:Array<Task>, global: globalState}>){
    this.session$ = this.store.select("session");
    this.tasks$ = this.store.select("tasks");
    this.global$ = this.store.select("global");
  }

  ngOnInit(): void {
    this.session$.subscribe((state)=>{
      this.remainingLoop = state.remainingLoop;
    })
    this.resetTimerValues();
  }

  

  backToSetup():void{
    this.store.dispatch(sessionState());
    this.resetTimerValues();
  }
  

  boot():void{
    this.session$.subscribe((state)=>{
      this.remainingLoop = state.remainingLoop;
    })
    this.resetTimerValues();
  }
  
  endSession():boolean{
    let result : boolean = false;
    if(this.remainingLoop <=0){
      result = true;
    }
    return result;
  }
  
  resetTimerValues():void{
    this.session$.subscribe((state)=>{
      this.canPauseActualTime = false;
      this.workTimeArray = state.workDuration.split(":");
      this.workTotalSeconds = parseInt(this.workTimeArray[0])* 3600 + parseInt(this.workTimeArray[1]) * 60 + parseInt(this.workTimeArray[2]);
      this.workTimer = state.workDuration;
      this.pauseTimeArray = state.pauseDuration.split(":");
      this.pauseTotalSeconds = parseInt(this.pauseTimeArray[0])* 3600 + parseInt(this.pauseTimeArray[1]) * 60 + parseInt(this.pauseTimeArray[2]);
      this.pauseTimer = state.pauseDuration;
    })
  }

  startTimer(){
    if(this.boolTimer){
      this.pauseTimerInterval = setInterval(()=>this.updatePauseTimer(), 1000);
    }else{
      this.workTimerInterval = setInterval(()=>this.updateWorkTimer(), 1000);
    }
  }

  manageTimer(){
    if(this.boolTimer)  return
    if(this.canPauseActualTime == true){
      this.canPauseActualTime = false;
      this.pause(this.workTimerInterval);
    }else{
      this.canPauseActualTime = true;
      this.startTimer();
    }
  }

  stopSession(){
    clearInterval(this.workTimerInterval);
    clearInterval(this.pauseTimerInterval);
  }
  updateWorkTimer(){
    let hours = Math.floor(this.workTotalSeconds / 3600).toString();
    let minutes = Math.floor((this.workTotalSeconds % 3600) / 60).toString();
    let seconds = (this.workTotalSeconds % 60).toString();

    if(hours.length <= 1){
      hours = "0"+hours;
    }

    if(minutes.length <= 1){
      minutes = "0"+minutes;
    }
    
    if(seconds.length <= 1){
      seconds = "0"+seconds;
    }
    
    this.workTimer = `${hours}:${minutes}:${seconds}`;
    console.log(this.workTimer);
    // Decrease total seconds
  
    // Stop the timer when it reaches zero
    if (this.workTotalSeconds < 0) {
      this.boolTimer = true;
      this.resetTimerValues();
      clearInterval(this.workTimerInterval);
      this.startTimer();
    }
    this.workTotalSeconds--;
  }

  updatePauseTimer(){
    let hours = Math.floor(this.pauseTotalSeconds / 3600).toString();
    let minutes = Math.floor((this.pauseTotalSeconds % 3600) / 60).toString();
    let seconds = (this.pauseTotalSeconds % 60).toString();

    if(hours.length <= 1){
      hours = "0"+hours;
    }

    if(minutes.length <= 1){
      minutes = "0"+minutes;
    }
    
    if(seconds.length <= 1){
      seconds = "0"+seconds;
    }
    
    this.pauseTimer = `${hours}:${minutes}:${seconds}`;
    console.log(this.pauseTimer);
    // Decrease total seconds
  
    // Stop the timer when it reaches zero
    if (this.pauseTotalSeconds < 0) {
      this.remainingLoop--;
      //this.store.dispatch(updateSession({updatedSession:{..., remainingLoop:this.remainingLoop}}))
      this.boolTimer = false;
      this.resetTimerValues();
      clearInterval(this.pauseTimerInterval);
      if(this.remainingLoop > 0){
        this.startTimer();
        this.canPauseActualTime = true;
      }else{
        this.stopSession();
        alert("Session finished !");
      }
    }
    this.pauseTotalSeconds--;
  }
  
  pause(interval:any){
    clearInterval(interval);
  }
  // Update the timer every second
  
  scaleBar():number{
    let value = undefined;
    if(!this.boolTimer){
      value = this.workTotalSeconds;
    }else{
      value = this.pauseTotalSeconds;
    }
    return Math.min(100, Math.max(0, value));
  }
}
