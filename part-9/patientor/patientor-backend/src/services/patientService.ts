import patientData from '../data/patient.json';
import { Patient, NewPatient } from '../types';

const patients: Patient[] = patientData;

const getPatients = (): Omit<Patient, 'ssn'>[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: (patients.length + 1).toString(),
    ...patient,
  };

  patients.push(newPatient);
  return newPatient;
};

export default { getPatients, addPatient };
