import diagnoses from '../data/diagnoses';

import { Diagnosis } from '../types';

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
const getDiagnoses = (): Diagnosis[] => diagnoses;

export default { getDiagnoses }; 
