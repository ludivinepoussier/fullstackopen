import patients from '../data/patient.json';
import { PublicPatient, Patient, NewPatient } from '../types';

const getPatients = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => {
    return {
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    };
  });
};

const getPatientByID = (id: string): Patient | undefined => {
  const pub = patients.find((pub: PublicPatient) => pub.id === id);
  if(pub === undefined) return undefined;

  return { ...pub, entries: [] };
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: (patients.length + 1).toString(),
    ...patient,
  };

  patients.push(newPatient);
  return newPatient;
};

export default { getPatients, getPatientByID, addPatient };
