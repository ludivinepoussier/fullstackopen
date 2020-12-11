import React from 'react';
import {
  Entry,
  HospitalEntry,
  OccupationalHealthcareEntry,
  HealthCheckEntry
} from '../types';
import { Icon } from 'semantic-ui-react';

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const Hospital: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  return (
    <div>
      <div>
        <h2>{entry.date} <Icon name="h square" /></h2>
      </div>
      <p>{entry.description}</p>
      <p>{entry.specialist}</p>
      <h4>Discharge</h4>
      <p>Date: {entry.discharge?.date}</p>
      <p>Criteria: {entry.discharge?.criteria}</p>
      {entry.diagnosisCodes && (
        <div>
          <h4>Diagnosis Codes</h4>
          <ul>
            {entry.diagnosisCodes &&
              entry.diagnosisCodes.map((code) => <li key={code}>{code}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
};

const OccupationalHealthcare: React.FC<{
  entry: OccupationalHealthcareEntry;
}> = ({ entry }) => {
  return (
    <div>
      <h2>{entry.date} <Icon name="stethoscope" /></h2>
      <p>{entry.description}</p>
      <p>{entry.specialist}</p>
      <h4>Employer Name</h4>
      <p>{entry.employerName}</p>
      {entry.sickLeave && (
        <div>
          <h4>Sick Leave</h4>
          <p>{entry.sickLeave?.startDate} - {entry.sickLeave?.endDate}</p>
        </div>
      )}
      {entry.diagnosisCodes && (
        <div>
          <h4>Diagnosis Codes</h4>
          <ul>
            {entry.diagnosisCodes &&
              entry.diagnosisCodes.map((code) => <li key={code}>{code}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
};

const HealthCheck: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  return (
    <div>
      <h2>{entry.date} <Icon name="user md" /></h2>
      <p>{entry.description}</p>
      <p>{entry.specialist}</p>
      {entry.diagnosisCodes && (
        <div>
          <h4>Diagnosis Codes</h4>
          <ul>
            {entry.diagnosisCodes &&
              entry.diagnosisCodes.map((code) => <li key={code}>{code}</li>)}
          </ul>
        </div>
      )}
      {entry.healthCheckRating === 0 && (<Icon name="heart" color="green" size="large" />)}
      {(entry.healthCheckRating === 1 || entry.healthCheckRating === 2) && (<Icon name="heart" color="yellow" size="large" />)}
      {entry.healthCheckRating === 3 && (<Icon name="heart" color="red" size="large" />)}
    </div>
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case 'Hospital':
      return <Hospital entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcare entry={entry} />;
    case 'HealthCheck':
      return <HealthCheck entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
