interface CalculateValues {
  value1: number[];
  value2: number;
}

const verifyArguments = (args: Array<string>): CalculateValues => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const inputValues = args.slice(2);
  const inputNumbers = inputValues.map(it => Number(it));

  if (!inputValues.some(it => isNaN(Number(it)))) {
    return {
      value1: inputNumbers,
      value2: inputNumbers.pop(),
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

interface calculatorResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (dailyHours: number[], targetNum: number): calculatorResult => {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter(hours => hours > 0).length;
  const target = targetNum;
  const totalHours = dailyHours.reduce((acc: number, cur: number) => acc + cur, 0);
  const average = totalHours / periodLength;
  const success = average >= targetNum;
  let rating;
  let ratingDescription;

  if (average > targetNum) {
    rating = 3;
    ratingDescription = 'Well done, you did more than expected!';
  }
  else if (average < targetNum) {
    rating = 1;
    ratingDescription = 'You could do better. Don\'t give up';
  }
  else if (average === targetNum) {
    rating = 2;
    ratingDescription = 'Well done, you achieved your goals!';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  }

}

try {
  const { value1, value2 } = verifyArguments(process.argv);
  console.log(calculateExercises(value1, value2));
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message);
}
