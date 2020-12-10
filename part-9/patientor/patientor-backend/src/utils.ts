/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  NewPatient,
  Gender,
  Entry,
  HospitalEntry,
  OccupationalHealthcareEntry,
  HealthCheckEntry,
  BaseEntry,
  Diagnosis,
  NewEntry,
} from './types';

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (dateOfBirth: string): boolean => {
  return Boolean(Date.parse(dateOfBirth));
};

const isGender = (gender: any): gender is Gender => {
  return Object.values(Gender).includes(gender);
};

const isBaseEntry = (entry: any): entry is BaseEntry => {
  if (entry.diagnosisCodes) {
    if (!parseDiagnosis(entry.diagnosisCodes)) {
      throw new Error('Incorrect Diagnosis Code');
    }
  }

  if (
    !entry ||
    !isString(entry.id) ||
    !isString(entry.description) ||
    !isDate(entry.date) ||
    !isString(entry.specialist)
  ) {
    throw new Error('Incorrect id, description, date or specialist');
  }

  return entry;
};

const isNewBaseEntry = (entry: any): entry is BaseEntry => {
  if (entry.diagnosisCodes) {
    if (!parseDiagnosis(entry.diagnosisCodes)) {
      throw new Error('Incorrect Diagnosis Code');
    }
  }

  if (
    !entry ||
    !isString(entry.description) ||
    !isDate(entry.date) ||
    !isString(entry.specialist)
  ) {
    throw new Error('Incorrect description, date or specialist');
  }

  return entry;
};

const isHospitalEntry = (entry: any): entry is HospitalEntry => {
  if (entry.discharge) {
    return (
      Object.keys(entry.discharge).includes('date') &&
      Object.keys(entry.discharge).includes('criteria')
    );
  }
  return false;
};

const isOccupationalHealthcareEntry = (
  entry: any
): entry is OccupationalHealthcareEntry => {
  if (entry.employerName) {
    if (entry.sickLeave) {
      return (
        Object.keys(entry.sickLeave).includes('startDate') &&
        Object.keys(entry.sickLeave).includes('endDate')
      );
    }
    return true;
  }
  return false;
};

const isHealthCheckEntry = (entry: any): entry is HealthCheckEntry => {
  if (
    entry.healthCheckRating === undefined &&
    !isString(entry.healthCheckRating)
  ) {
    return false;
  }
  return entry;
};

const parseDiagnosis = (
  diagnosisCodes: any
): diagnosisCodes is Array<Diagnosis['code']> => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  return diagnosisCodes.every((diagnosisCode: any) => isString(diagnosisCode));
};

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }

  return name;
};

const parseDateOfBirth = (dateOfBirth: any): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error('Incorrect or missing date of birth');
  }
  return dateOfBirth;
};

const parseSSN = (ssn: any): string => {
  if (!ssn || !isString(ssn)) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    throw new Error(`Incorrect or missing SSN ${ssn}`);
  }
  return ssn;
};

const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }

  return occupation;
};

const parseEntry = (entries: any): Entry[] => {
  if (!entries) {
    throw new Error('Missing entries');
  }
  return entries.map((entry: any) => {
    if (!isBaseEntry(entry)) {
      throw new Error('Incorrect or missing base entry');
    }
    if (isHospitalEntry(entry)) {
      return entry;
    } else if (isOccupationalHealthcareEntry(entry)) {
      return entry;
    } else if (isHealthCheckEntry(entry)) {
      return entry;
    } else {
      throw new Error('Not a correct entry');
    }
  });
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender');
  }
  return gender;
};

// eslint-disable-next-line  @typescript-eslint/explicit-module-boundary-types
const parsedNewPatient = (object: any): NewPatient => {
  const newPatient: NewPatient = {
    name: parseName(object.name),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    ssn: parseSSN(object.ssn),
    occupation: parseOccupation(object.occupation),
    gender: parseGender(object.gender),
    entries: parseEntry(object.entries),
  };

  return newPatient;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const parsedNewEntry = (object: any): NewEntry => {
  if (!isNewBaseEntry(object)) {
    throw new Error('Missing base entry');
  }
  if (isHospitalEntry(object)) {
    return object;
  } else if (isOccupationalHealthcareEntry(object)) {
    return object;
  } else if (isHealthCheckEntry(object)) {
    return object;
  } else {
    throw new Error(`Not an entry from the above types.`);
  }
};

export default { parsedNewPatient, parsedNewEntry };
