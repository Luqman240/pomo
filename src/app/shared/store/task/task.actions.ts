import { createAction, props } from '@ngrx/store';
import { Task } from '../../types/task';

export const addTask = createAction('[Task Component] Add task', props<{task:Task}>());
export const deleteTask = createAction('[Task Component] Delete task', props<{id:number}>());
