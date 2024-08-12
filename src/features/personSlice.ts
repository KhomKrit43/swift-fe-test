import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Person } from '../types/person';
import { RootState } from '../app/store';
import { loadFromLocalStorage, saveToLocalStorage } from '../utils/localStorage';

interface PersonState {
    people: Person[];
}

const initialState: PersonState = {
    people: loadFromLocalStorage('people') || [],
};

const personSlice = createSlice({
    name: 'person',
    initialState,
    reducers: {
        addPerson: (state, action: PayloadAction<Person>) => {
            state.people.push(action.payload);
            saveToLocalStorage('people', state.people);
        },
        editPerson: (state, action: PayloadAction<Person>) => {
            const index = state.people.findIndex(person => person.id === action.payload.id);
            if (index !== -1) {
                state.people[index] = action.payload;
                saveToLocalStorage('people', state.people);
            }
        },
        deletePerson: (state, action: PayloadAction<number>) => {
            state.people = state.people.filter(person => person.id !== action.payload);
            saveToLocalStorage('people', state.people);
        }
    }
});

export const { addPerson, editPerson, deletePerson } = personSlice.actions;
export const selectPeople = (state: RootState) => state.person.people;
export default personSlice.reducer;
