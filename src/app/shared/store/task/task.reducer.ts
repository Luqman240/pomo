import { createReducer, on } from '@ngrx/store';
import { addTask, deleteTask } from './task.actions';
import { Task } from '../../types/task';

export const initialState : Array<Task> = [];

export const taskReducer = createReducer(
  initialState,
  on(addTask, (state, {task}) => [...state, task]),
  on(deleteTask, (state, { id }) => state.filter(task => task.id !== id))
);