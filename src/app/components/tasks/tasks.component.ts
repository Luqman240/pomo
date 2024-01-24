import { Component, OnInit } from '@angular/core';
import { Task } from '../../shared/types/task';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { addTask, deleteTask } from '../../shared/store/task/task.actions';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit{
  tasks$ : Observable<Array<Task>>;

  length : number = 0;

  list : Array<Task> = [
    {
      id : 0,
      title:"Task 1"
    },
    {
      id : 0,
      title:"Task 1aaaad"
    },
    {
      id : 0,
      title:"Task vvvvadez"
    },
    {
      id : 0,
      title:"Task ffaafa1"
    },
    {
      id : 0,
      title:"Taskddd 1"
    },
    {
      id : 0,
      title:"Task ee1"
    },
    {
      id : 0,
      title:"Task aa1"
    },
    {
      id : 0,
      title:"Taskddd 1"
    },
  ]
  constructor(private store: Store<{ tasks:Array<Task> }>){
    this.tasks$ = this.store.select("tasks");
  }

  ngOnInit(): void {
    this.tasks$.subscribe((tasks)=>{
      length = tasks.length;
    });
  }

  findTaskByTitle(title:string){
    let res : boolean = false;
    this.tasks$.subscribe((tasks)=>{
      if(tasks.find((task)=>task.title == title)) res = true;
    });
    return res;
  }

  addTask():void{
    let taskTitle = (document.getElementById("task-goal")! as HTMLInputElement).value;
    let length : number = 0;
    
    if(this.findTaskByTitle(taskTitle)) return;

    this.tasks$.subscribe((tasks)=>{
      length = tasks.length;
    });

    let newTask : Task = {
      id : length +1,
      title : taskTitle!
    }
    this.store.dispatch(addTask({task : newTask}));
  }
  
  deleteTask(id:number){
    this.store.dispatch(deleteTask({id:id}));
  }
}
