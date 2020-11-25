import diagnoseData from '../data/diagnoses.json';

import { Diagnose } from '../types';

const diagnoses: Diagnose[] = diagnoseData;

const getDiagnoses = (): Diagnose[] => diagnoses;

export default { getDiagnoses }; 
