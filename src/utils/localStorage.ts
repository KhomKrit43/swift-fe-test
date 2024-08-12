export const loadFromLocalStorage = (key: string): any => {
    try {
        const serializedState = localStorage.getItem(key);
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err: any) {
        console.error("Could not load from localStorage", err);
        return undefined;
    }
};

export const saveToLocalStorage = (key: string, value: any): void => {
    try {
        const serializedState = JSON.stringify(value);
        localStorage.setItem(key, serializedState);
    } catch (err: any) {
        console.error("Could not save to localStorage", err);
    }
};