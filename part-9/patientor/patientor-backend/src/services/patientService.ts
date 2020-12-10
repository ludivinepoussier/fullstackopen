/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { v4 as uuid } from 'uuid';
import patients from '../data/patients';
import { PublicPatient, Patient, NewPatient, NewEntry, Entry } from '../types';

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
  return patients.find((patient) => patient.id === id);
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: (patients.length + 1).toString(),
    ...patient,
  };

  patients.push(newPatient);
  return newPatient;
};

const addEntry = (newEntry: NewEntry, patientID: string): Entry => {
  const id = uuid();
  const entryWithID = { ...newEntry, id };
  patients.forEach((patient) => {
    if (patient.id === patientID) {
      patient.entries.push(entryWithID);
      return patient;
    }
    return patient;
  });

  return entryWithID;
};

export default { getPatients, getPatientByID, addPatient, addEntry };
