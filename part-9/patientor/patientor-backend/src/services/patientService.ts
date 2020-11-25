import patients from '../data/patient';
import { Patient, PatientLessSsn } from '../types';

const getPatients = (): Patient[] => patients;

const getPatientsLessSsn = (): PatientLessSsn[] => 
  patients.map(
    ({ id, name, dateOfBirth, gender, occupation }) => ({ id, name, dateOfBirth, gender, occupation })
  );

export default { getPatients, getPatientsLessSsn };
