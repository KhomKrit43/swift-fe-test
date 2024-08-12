export interface Person {
    id: number;
    title: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    Nationality: string;
    citizenId: string;
    gender: string;
    phoneCountryCode: string;
    phoneNumber: string;
    passportNumber: string;
    expectedSalary: number;
}

export interface PersonState {
    persons: Person[];
}