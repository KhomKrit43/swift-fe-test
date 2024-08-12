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
            const stateArr = JSON.parse(JSON.stringify(state.people));
            console.log("state", stateArr);
            console.log("action", action.payload);
            const index = stateArr.findIndex((person: any) => person.id === action.payload.id);
            console.log(index);
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
