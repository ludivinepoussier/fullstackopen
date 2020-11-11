type Result = string;

const calculateBmi = (height: number, weight: number): Result => {
  let bmi = weight / ((height / 100) ** 2);
  if (bmi < 18.5) {
    return 'Underweight';
  } else if (bmi < 25) {
    return 'Normal (healthy weight)';
  } else if (bmi < 30) {
    return 'Overweight';
  } else {
    return 'Obese';
  }

}

console.log(calculateBmi(180, 74));
