import { createAction, props } from '@ngrx/store';
import { Session } from '../../types/session';

export const updateSession = createAction('[Session Component] Update session', props<{updatedSession:Session}>());
export const reset = createAction('[Session Component] Reset session');
