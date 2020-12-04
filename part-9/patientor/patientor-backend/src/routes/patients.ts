import express from 'express';
import patientService from '../services/patientService';
import parsedNewPatient from '../utils';

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
    const newPatient = parsedNewPatient(req.body);

    const addedPatient = patientService.addPatient(newPatient);

    res.json(addedPatient);
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(e.message);
  }
});

export default router; 
