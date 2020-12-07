import React from 'react';
import axios from 'axios';
import { Icon } from "semantic-ui-react";
import { Patient, Entry, Diagnosis } from '../types';
import { apiBaseUrl } from '../constants';
import { useStateValue } from '../state';
import { useParams } from 'react-router-dom';
import { setFetchedPatient, setDiagnosisList } from '../state';

const PatientView: React.FC = () => {

  const [{ patientDetails, diagnoses }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = React.useState<Patient>();

  React.useEffect(() => {
    async function getPatient() {
      try {
        const { data: patient } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(setFetchedPatient(patient));
        setPatient(patient);
      } catch (error) {
        console.error(error);
      }
    }

    async function fetchDiagnosisList() {
      try {
        const { data: diagnoses } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`
        );
        dispatch(setDiagnosisList(diagnoses));
      } catch (error) {
        console.log(error);
      }
    }

    if (patientDetails[id]) {
      setPatient(patientDetails[id]);
    } else {
      getPatient();
    }

    if (Object.values(diagnoses).length === 0) {
      fetchDiagnosisList();
    }
  }, [dispatch, id, patientDetails, diagnoses]);


  if (!patient || !diagnoses) return <div>Loading...</div>;

  return (
    <div>
      <h1>{patient.name} <Icon className={patient.gender} /> </h1>
      <p>SSN: {patient.ssn}</p>
      <p>Occupation: {patient.occupation}</p>
      <h2>entries</h2>
        {patient.entries.map((entry: Entry) => {
          return (
            <div key={entry.id}>
              <p>{entry.date} {entry.description}</p>
              <ul>
                {entry.diagnosisCodes &&
                  entry.diagnosisCodes.map(
                    (diagonsisCode: Diagnosis['code']) => (
                      <li key={diagonsisCode}>{diagonsisCode} {diagnoses.find(d => d.code === diagonsisCode)?.name}</li>
                    )
                  )}
              </ul>
            </div>
          )
        })}
    </div>
  );
}

export default PatientView;
