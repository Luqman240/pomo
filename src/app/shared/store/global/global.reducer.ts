import { createReducer, on } from '@ngrx/store';
import { sessionState, pauseState } from './global.actions';

type globalState = {
  canAddSession: boolean;
  canPause: boolean;
};

export const initialState: globalState = {
  canAddSession: true,
  canPause: false,
};

export const globalReducer = createReducer(
  initialState,
  on(sessionState, (state) => ({ canAddSession: !state.canAddSession, canPause:state.canPause })),
  on(pauseState, (state) => ({ canAddSession: state.canAddSession, canPause:!state.canPause }))
);