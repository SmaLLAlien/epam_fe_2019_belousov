function getSum(num1, num2) {
  // find the biggest number to iterate through it
  const biggerNumber = num1.length > num2.length ? num1.split('').reverse() : num2.split('').reverse();
  const smallerNumber = num1.length > num2.length ? num2.split('').reverse() : num1.split('').reverse();

  const arraySum = [];

  // get sum every number of two arrays
  for (let i = 0; i < biggerNumber.length; i++) {
    if (!smallerNumber[i]) {
      smallerNumber[i] = 0;
    }
    arraySum[i] = +biggerNumber[i] + +smallerNumber[i];
  }

  // find if there are numbers > 10 in array and move tens to next number
  moveTensToNextPosition(arraySum);

  return arraySum.reverse().join('');
}

function moveTensToNextPosition(array) {
  for (let i = 0; i < array.length; i++) {
    const unit = array[i] % 10;
    const tens = Math.floor(array[i] / 10);
    array[i] = unit;
    if (array[i + 1]) {
      array[i + 1] += tens;
    } else if (tens !== 0) {
      array[i + 1] = tens;
    }
  }
}

getSum('9999','9999');
