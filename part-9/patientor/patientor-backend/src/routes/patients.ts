import express from 'express';
import patientService from '../services/patientService';
import utils from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatients());
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const patient = patientService.getPatientByID(id);
  if (patient) {
    return res.json(patient);
  } else {
    return res.status(404).send({ error: 404, message: 'Not Found' });
  }
});

router.post('/', (req, res) => {
  try {
    const newPatient = utils.parsedNewPatient(req.body);

    const addedPatient = patientService.addPatient(newPatient);

    res.json(addedPatient);
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(e.message);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const newEntry = utils.parsedNewEntry(req.body);
    const patientId = req.params.id;
    const addedEntry = patientService.addEntry(newEntry, patientId);
    res.json(addedEntry);
  } catch (error) {
    res.status(400).send('Something went wrong!');
  }
});

export default router; 
