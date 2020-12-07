import diagnoses from '../data/diagnoses';

import { Diagnose } from '../types';

const getDiagnoses = (): Diagnose[] => diagnoses;

export default { getDiagnoses }; 
