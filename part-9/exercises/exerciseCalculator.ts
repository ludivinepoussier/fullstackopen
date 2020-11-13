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
    ratingDescription = 'Well done, you achieved your goals!'
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

console.log(calculateExercises([1, 2, 3, 4, 5, 0, 0], 2))
