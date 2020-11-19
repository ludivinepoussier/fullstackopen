import express, { Request, Response } from 'express';
import calculateBmi from './calculateBmi';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { weight, height } = req.query;
  if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
    const bmi = calculateBmi(Number(height), Number(weight));
    res.send(
      { weight, height, bmi }
    );
  } else {
    res.send(
      { error: "malformatted parameters" }
    );
  }
});

app.post('/exercises', (req: Request, res: Response) => {

  type CalculateValues = {
    daily_exercises: number[],
    target: number,
  };


  const { daily_exercises, target } = req.body as CalculateValues;

  if (!daily_exercises || !target) return res.json({ error: "parameters missing" });
  if (typeof (target) !== "number" || daily_exercises.some(isNaN)) return res.json({ error: "malformatted parameters" });

  const daily_exercisesTyped = daily_exercises.map(it => Number(it));
  const targetTyped = Number(target);

  const result = calculateExercises(daily_exercisesTyped, targetTyped);

  return res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
