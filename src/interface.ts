export interface Patient {
    id: number;
    first_name: string;
    last_name: string;
    dob: string;
    allergies: string[];
    medications: string[];
}