import { State } from "./state";
import { Patient, Diagnosis, Entry } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: 'FETCHED_PATIENT';
      payload: Patient;
  }
  | {
    type: "SET_DIAGNOSIS_LIST";
    payload: Diagnosis[];
  }
  | {
    type: 'ADD_ENTRY_TO_PATIENT';
    payload: Entry;
    patientID: string;
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case 'FETCHED_PATIENT':
      return {
        ...state,
        patientDetails: {
          ...state.patientDetails,
          [action.payload.id]: action.payload
        }
      };
    case 'SET_DIAGNOSIS_LIST':
      const diagnoses: Diagnosis[] = action.payload;
      return {
        ...state,
        diagnoses
      };
    case 'ADD_ENTRY_TO_PATIENT': {
      const newPatients = state.patientDetails[action.patientID];
      console.log(newPatients);
      newPatients.entries.push(action.payload);

      return {
        ...state,
        patientDetails: {
          ...state.patientDetails,
          [action.patientID]: newPatients
        }
      };
    }
    default:
      return state;
  }
};

export const setFetchedPatient = (patient: Patient): Action => {
  return { type: 'FETCHED_PATIENT', payload: patient };
};

export const addPatient = (patient: Patient): Action => {
  return { type: 'ADD_PATIENT', payload: patient };
};

export const setPatientList = (patientListFromApi: Patient[]): Action => {
  return { type: 'SET_PATIENT_LIST', payload: patientListFromApi };
};

export const setDiagnosisList = (diagnosisList: Diagnosis[]): Action => {
  return { type: "SET_DIAGNOSIS_LIST", payload: diagnosisList };
};

export const setEntrytoPatient = (entry: Entry, patientID: string): Action => {
  return { type: 'ADD_ENTRY_TO_PATIENT', payload: entry, patientID };
};
