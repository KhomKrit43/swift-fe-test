import { combineReducers } from 'redux';
import personReducer from '../features/personSlice';

export const rootReducer = combineReducers({
  person: personReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
