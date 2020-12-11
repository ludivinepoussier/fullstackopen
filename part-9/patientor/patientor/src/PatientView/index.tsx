import React from 'react';
import axios from 'axios';
import { Icon } from "semantic-ui-react";
import { Patient, Entry, Diagnosis, NewEntry } from '../types';
import { apiBaseUrl } from '../constants';
import { useStateValue } from '../state';
import { useParams } from 'react-router-dom';
import { setFetchedPatient, setDiagnosisList, setEntrytoPatient } from '../state';
import EntryDetails from '../components/EntryDetails';
import HealthCheckEntryForm from './HealthCheckEntryForm';
import HospitalEntryForm from './HospitalEntryForm';
import OccupationalEntryForm from './OccupationalEntryForm';
import { Button } from 'semantic-ui-react';

const PatientView: React.FC = () => {

  const [{ patientDetails, diagnoses }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = React.useState<Patient>();
  const [showForm, setShowForm] = React.useState<Boolean | true>();
  const [entryType, setEntryType] = React.useState<
    String | 'HealthCheckEntry'
  >();
  const [error, setError] = React.useState<String | undefined>();

  const onSubmit = async (values: NewEntry) => {
    console.log(values);
    try {
      const { data: newEntryDetails } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      console.log('after post', newEntryDetails);
      dispatch(setEntrytoPatient(newEntryDetails, id));
      setShowForm(false);
    } catch (e) {
      console.error(e.response.data);
      setErrorMessage(e.response.data);
    }
  };

  const onCancel = (): void => {
    setShowForm(false);
  };

  const setErrorMessage = (message: string) => {
    setError(message);
    setTimeout(() => setError(undefined), 5000);
  };

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
        setErrorMessage(error.response.data);
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
      {error && (
        <div style={{ padding: '10px', border: '2px solid red' }}>{error}</div>
      )}
      <h1>{patient.name} <Icon className={patient.gender} /> </h1>
      <p>SSN: {patient.ssn}</p>
      <p>Occupation: {patient.occupation}</p>

      <Button
        onClick={() => {
          showForm ? setShowForm(false) : setShowForm(true);
        }}
      >
        Add Entry
      </Button>

      <select onChange={(e) => setEntryType(e.target.value)}>
        <option value="HealthCheckEntry">HealthCheckEntry</option>
        <option value="HospitalEntry">HospitalEntry</option>
        <option value="OccupationalHealthcareEntry">
          OccupationalHealthcareEntry
        </option>
      </select>

      {showForm && entryType === 'HealthCheckEntry' && (
        <HealthCheckEntryForm onSubmit={onSubmit} onCancel={onCancel} />
      )}
      {showForm && entryType === 'HospitalEntry' && (
        <HospitalEntryForm onSubmit={onSubmit} onCancel={onCancel} />
      )}
      {showForm && entryType === 'OccupationalHealthcareEntry' && (
        <OccupationalEntryForm onSubmit={onSubmit} onCancel={onCancel} />
      )}
      
      <h2>entries</h2>
        {patient.entries.map((entry: Entry) => {
          return (
            <div 
              key={entry.id} 
              style={{
                border: 'solid 2px lightgrey',
                marginTop: 10,
                marginBottom: 10,
                padding: 5,
                borderRadius: 5,
              }}
            >
              <EntryDetails entry={entry} />
            </div>
          )
        })}
    </div>
  );
}

export default PatientView;
