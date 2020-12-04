import React from 'react';
import axios from 'axios';
import { Icon } from "semantic-ui-react";
import { Patient } from '../types';
import { apiBaseUrl } from '../constants';
import { useStateValue } from '../state';
import { useParams } from 'react-router-dom';
import { setFetchedPatient } from '../state';

const PatientView: React.FC = () => {

  const [{ patientDetails }, dispatch] = useStateValue();
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

    if (patientDetails[id]) {
      setPatient(patientDetails[id]);
    } else {
      getPatient();
    }
  }, [dispatch, id, patientDetails]);

  if (!patient) return <div>Loading...</div>;

  return (
    <div>
      <h1>{patient.name} <Icon className={patient.gender} /> </h1>
      <p>SSN: {patient.ssn}</p>
      <p>Occupation: {patient.occupation}</p>
    </div>
  );
};

export default PatientView;
