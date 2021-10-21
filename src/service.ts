import { Patient } from './interface'
import { openDb } from './openDB'

const db = openDb();

export const getPatientById = async (patient_id: number): Promise<Patient> => {
    const patient = {} as Patient;
    patient.id = patient_id;
    patient.dob = "";
    patient.first_name = "";
    patient.last_name = "";
    patient.allergies = [];
    patient.medications = [];
    const query = "SELECT answer,question_id FROM questionnaire_answer WHERE questionnaire_id IN (SELECT id FROM patient_questionnaire WHERE patient_id = " + patient_id + ")"
    const result = await (await db).all(query);
    result.forEach(row => {
        if (row.question_id === 1 && patient.dob === "") {
            patient.dob = row.answer;
        } else if (row.question_id === 2 && patient.first_name === "") {
            patient.first_name = row.answer;
        } else if (row.question_id === 3 && patient.last_name === "") {
            patient.last_name = row.answer;
        } else if (row.question_id === 4 && row.answer !== undefined && row.answer !== "" && !patient.allergies.includes(row.answer)) {
            patient.allergies.push(row.answer);
        } else if (row.question_id === 5 && row.answer !== undefined && row.answer !== "" && !patient.medications.includes(row.answer)) {
            patient.medications.push(row.answer);
        }
    });
    return patient;
};