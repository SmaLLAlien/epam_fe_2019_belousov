function sum(value1, value2) {
  let valueNumber;
  let valueString;
  if (typeof value1 === 'number') {
    valueNumber = value1;
    valueString = value2;
  } else {
    valueNumber = value2;
    valueString = value1;
  }

  if (!(valueNumber % 15)) {
    valueNumber *= -1;
  }

  return valueNumber + +valueString;
}

sum('25', 15);
sum(41, '3');
sum('3', 45);
sum('15', 15);
