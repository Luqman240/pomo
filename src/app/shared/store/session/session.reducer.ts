import { createReducer, on } from '@ngrx/store';
import { updateSession, reset } from './session.actions';
import { Session } from '../../types/session';

export const initialState : Session = {
  goal: "-- Work --",
  workDuration: "00:25:00",
  pauseDuration: "00:05:00",
  loop: 2,
  remainingLoop:2,
  remainingWorkDuration:"00:25:00",
  remainingPauseDuration:"00:05:00"
};

export const sessionReducer = createReducer(
  initialState,
  on(updateSession, (state, { updatedSession }) => ({
    ...state,
    goal: state.goal !== updatedSession.goal? updatedSession.goal : state.goal,
    workDuration: state.workDuration !== updatedSession.workDuration? updatedSession.workDuration : state.workDuration,
    pauseDuration: state.pauseDuration !== updatedSession.pauseDuration? updatedSession.pauseDuration : state.pauseDuration,
    loop: state.loop !== updatedSession.loop? updatedSession.loop : state.loop,
    remainingLoop: state.remainingLoop !== updatedSession.remainingLoop? updatedSession.remainingLoop : state.remainingLoop,
    remainingWorkDuration: state.remainingWorkDuration !== updatedSession.remainingWorkDuration? updatedSession.remainingWorkDuration : state.remainingWorkDuration,
    remainingPauseDuration: state.remainingPauseDuration !== updatedSession.remainingPauseDuration? updatedSession.remainingPauseDuration : state.remainingPauseDuration,
    // Update other properties as needed
  })),
  on(reset, () => initialState),
);